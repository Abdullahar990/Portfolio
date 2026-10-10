import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = new URL(process.env.TEST_BASE_URL ?? 'http://localhost:3000');
const configuredOrigin =
  process.env.SITE_URL?.trim() ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.trim()}`
    : null);
const expectedOrigin = configuredOrigin
  ? new URL(configuredOrigin.includes('://') ? configuredOrigin : `https://${configuredOrigin}`)
      .origin
  : null;
const indexable =
  expectedOrigin !== null &&
  expectedOrigin.startsWith('https://') &&
  !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(new URL(expectedOrigin).hostname) &&
  process.env.VERCEL_ENV !== 'preview';
const routes = [
  '/',
  '/projects/guardiansense',
  '/projects/check-inn',
  '/projects/disease-prediction',
  '/projects/spare-parts',
];
const titles = new Set();
const descriptions = new Set();
const images = new Set();
const results = [];
const checkedImages = new Map();

function decode(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}
function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g))
    result[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? match[4]);
  return result;
}
function meta(head, key) {
  const tags = [...head.matchAll(/<meta\b[^>]*>/gi)].map((match) => attributes(match[0]));
  return tags.find((tag) => tag.name === key || tag.property === key)?.content;
}
function schemaTypes(entries) {
  return entries.flatMap((entry) => entry['@graph'] ?? entry);
}
async function fetchLocal(path) {
  return fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(15000) });
}
function checkSecurity(response, route) {
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff', `${route}: nosniff`);
  assert.match(
    response.headers.get('x-frame-options') ?? '',
    /^(DENY|SAMEORIGIN)$/i,
    `${route}: frame protection`,
  );
  assert.match(
    response.headers.get('referrer-policy') ?? '',
    /^(strict-origin-when-cross-origin|strict-origin|no-referrer)$/,
    `${route}: referrer policy`,
  );
  const permissions = response.headers.get('permissions-policy') ?? '';
  for (const feature of ['camera', 'microphone', 'geolocation'])
    assert(permissions.includes(`${feature}=()`), `${route}: disable unused ${feature}`);
  const contentPolicy = response.headers.get('content-security-policy') ?? '';
  for (const directive of ["object-src 'none'", "base-uri 'self'", "frame-ancestors 'none'"])
    assert(contentPolicy.includes(directive), `${route}: ${directive}`);
  assert(!response.headers.has('x-powered-by'), `${route}: framework fingerprint header`);
}
async function checkSocialImage(url, route) {
  const source = new URL(url);
  assert(source.protocol === 'http:' || source.protocol === 'https:', `${route}: social image URL`);
  assert(source.pathname.startsWith('/social/'), `${route}: custom social image`);
  if (checkedImages.has(source.pathname)) return checkedImages.get(source.pathname);
  const response = await fetchLocal(source.pathname + source.search);
  assert.equal(response.status, 200, `${route}: social image HTTP status`);
  assert.match(response.headers.get('content-type') ?? '', /^image\/png\b/, `${route}: PNG card`);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert(bytes.length > 1000, `${route}: social image is not empty`);
  assert(
    bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
    'PNG signature',
  );
  assert.equal(bytes.readUInt32BE(16), 1200, `${route}: social image width`);
  assert.equal(bytes.readUInt32BE(20), 630, `${route}: social image height`);
  const info = { path: source.pathname, width: 1200, height: 630, bytes: bytes.length };
  checkedImages.set(source.pathname, info);
  return info;
}

for (const route of routes) {
  const response = await fetchLocal(route);
  assert.equal(response.status, 200, `${route}: HTTP status`);
  assert.match(response.headers.get('content-type') ?? '', /text\/html/, `${route}: HTML response`);
  checkSecurity(response, route);
  const html = await response.text();
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  assert(head, `${route}: server-rendered head`);
  assert.match(html, /<html\b[^>]*\blang="en"/, `${route}: document language`);
  assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, `${route}: single primary heading`);
  const title = decode(head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  assert(title.length >= 20 && title.length <= 100, `${route}: useful title length`);
  assert(!titles.has(title), `${route}: unique title`);
  titles.add(title);
  const description = meta(head, 'description');
  assert(description?.length >= 80 && description.length <= 350, `${route}: useful description`);
  assert(!descriptions.has(description), `${route}: unique description`);
  descriptions.add(description);
  assert.match(meta(head, 'viewport') ?? '', /width=device-width/, `${route}: responsive viewport`);
  assert.match(head, /<meta\b[^>]*charset="utf-8"/i, `${route}: UTF-8`);
  const canonicalTags = [...head.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => attributes(match[0]))
    .filter((tag) => tag.rel === 'canonical');
  if (route === '/') {
    const iconTags = [...head.matchAll(/<link\b[^>]*>/gi)]
      .map((match) => attributes(match[0]))
      .filter((tag) => tag.rel === 'icon' || tag.rel === 'apple-touch-icon');
    assert(
      iconTags.some((tag) => tag.rel === 'icon'),
      'Custom favicon metadata',
    );
    assert(
      iconTags.some((tag) => tag.rel === 'apple-touch-icon'),
      'Touch icon metadata',
    );
    for (const icon of iconTags) {
      const iconUrl = new URL(icon.href, base);
      const iconResponse = await fetchLocal(iconUrl.pathname + iconUrl.search);
      assert.equal(iconResponse.status, 200, `${icon.rel}: HTTP status`);
      assert.match(
        iconResponse.headers.get('content-type') ?? '',
        /^image\//,
        `${icon.rel}: image response`,
      );
      assert((await iconResponse.arrayBuffer()).byteLength > 100, `${icon.rel}: nonempty icon`);
    }
  }
  const robots = meta(head, 'robots') ?? '';
  if (expectedOrigin) {
    const canonical = new URL(route, expectedOrigin).href;
    assert.equal(canonicalTags.length, 1, `${route}: one canonical`);
    assert.equal(new URL(canonicalTags[0].href).href, canonical, `${route}: production canonical`);
    assert.equal(
      new URL(meta(head, 'og:url')).href,
      canonical,
      `${route}: matching Open Graph URL`,
    );
  } else {
    assert.equal(canonicalTags.length, 0, `${route}: no invented canonical`);
    assert(!meta(head, 'og:url'), `${route}: no invented Open Graph URL`);
  }
  if (indexable) assert(!/noindex/.test(robots), `${route}: configured production is indexable`);
  else assert(/noindex/.test(robots), `${route}: local/preview build is not indexable`);
  assert.equal(meta(head, 'og:title'), title, `${route}: matching social title`);
  assert.equal(meta(head, 'og:description'), description, `${route}: matching social description`);
  assert.equal(meta(head, 'twitter:card'), 'summary_large_image', `${route}: large Twitter card`);
  assert.equal(meta(head, 'twitter:title'), title, `${route}: matching Twitter title`);
  const socialImage = meta(head, 'og:image');
  assert(socialImage, `${route}: social image metadata`);
  assert.equal(meta(head, 'og:image:width'), '1200', `${route}: social image width metadata`);
  assert.equal(meta(head, 'og:image:height'), '630', `${route}: social image height metadata`);
  assert(meta(head, 'og:image:alt')?.length > 20, `${route}: meaningful social image alternative`);
  assert.equal(meta(head, 'twitter:image'), socialImage, `${route}: matching social image`);
  assert(!images.has(socialImage), `${route}: unique project social image`);
  images.add(socialImage);
  const image = await checkSocialImage(socialImage, route);
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter((match) => attributes(match[1]).type === 'application/ld+json')
    .map((match) => JSON.parse(match[2]));
  const schemas = schemaTypes(scripts);
  for (const type of route === '/' ? ['Person', 'WebSite'] : ['CreativeWork', 'BreadcrumbList'])
    assert(
      schemas.some((schema) => schema['@type'] === type),
      `${route}: ${type} structured data`,
    );
  for (const schema of schemas) {
    assert.equal(
      schema['@context'] ?? 'https://schema.org',
      'https://schema.org',
      `${route}: schema context`,
    );
    assert(!('aggregateRating' in schema), `${route}: no invented ratings`);
    if (schema.url) {
      const url = new URL(schema.url);
      if (expectedOrigin) assert.equal(url.origin, expectedOrigin, `${route}: schema URL origin`);
      else assert.fail(`${route}: unconfigured schema must omit URL`);
    }
    if (schema['@type'] === 'CreativeWork' && expectedOrigin)
      assert.equal(schema.url, new URL(route, expectedOrigin).href, `${route}: work schema URL`);
    if (schema['@type'] === 'BreadcrumbList') {
      assert(schema.itemListElement?.length >= 2, `${route}: breadcrumb trail`);
      const leaf = schema.itemListElement.at(-1);
      if (expectedOrigin)
        assert.equal(
          leaf.item,
          new URL(route, expectedOrigin).href,
          `${route}: breadcrumb current page`,
        );
    }
  }
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => decode(match[1])));
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attributes(match[0]).href;
    if (href?.startsWith('#'))
      assert(ids.has(decodeURIComponent(href.slice(1))), `${route}: existing anchor ${href}`);
  }
  assert(
    !/data-mtl-registry|__MTL_PREVIEW_RUNTIME__|localhost:5200/.test(html),
    `${route}: no Studio`,
  );
  results.push({
    route,
    status: response.status,
    title,
    canonical: canonicalTags[0]?.href ?? null,
    image,
  });
}
const sitemapResponse = await fetchLocal('/sitemap.xml');
assert.equal(sitemapResponse.status, 200, 'Sitemap HTTP status');
assert.match(sitemapResponse.headers.get('content-type') ?? '', /xml/, 'Sitemap content type');
const sitemap = await sitemapResponse.text();
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
assert.deepEqual(
  locations.sort(),
  indexable ? routes.map((route) => new URL(route, expectedOrigin).href).sort() : [],
  'Sitemap includes exactly the indexable pages',
);
const robotsResponse = await fetchLocal('/robots.txt');
assert.equal(robotsResponse.status, 200, 'Robots HTTP status');
const robots = await robotsResponse.text();
assert.match(robots, /User-Agent:\s*\*/i, 'Robots user agent');
if (indexable) {
  assert.match(robots, /Allow:\s*\/\s*$/im, 'Production robots allow crawling');
  assert(
    robots.includes(`Sitemap: ${new URL('/sitemap.xml', expectedOrigin).href}`),
    'Production sitemap URL',
  );
} else assert.match(robots, /Disallow:\s*\/\s*$/im, 'Local/preview robots disallow crawling');
for (const path of ['/this-page-does-not-exist', '/projects/this-project-does-not-exist']) {
  const response = await fetchLocal(path);
  assert.equal(response.status, 404, `${path}: real 404 status`);
  checkSecurity(response, path);
  const html = await response.text();
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const robotTags = [...head.matchAll(/<meta\b[^>]*>/gi)].map((match) => attributes(match[0]));
  assert(
    robotTags.some((tag) => tag.name === 'robots' && /noindex/.test(tag.content)),
    `${path}: noindex 404`,
  );
  assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, `${path}: readable 404 page`);
  results.push({ route: path, status: 404 });
}
const report = {
  passed: true,
  base: base.origin,
  expectedOrigin,
  indexable,
  pages: results,
  sitemapEntries: locations.length,
  securityHeaders: [
    'nosniff',
    'frame protection',
    'referrer policy',
    'permissions policy',
    'base/object/frame CSP',
  ],
};
await mkdir('test-results', { recursive: true });
await writeFile('test-results/site-check.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
