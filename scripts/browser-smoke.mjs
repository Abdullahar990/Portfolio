import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

await mkdir('test-results', { recursive: true });
const base = process.env.TEST_BASE_URL ?? 'http://localhost:3000';
const axeSource = await readFile(resolve('node_modules/axe-core/axe.min.js'), 'utf8');
const production = process.env.TEST_PRODUCTION === '1';
const client = new Client({ name: 'portfolio-browser-smoke', version: '1.0.0' });
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [
    resolve('node_modules/@playwright/mcp/cli.js'),
    '--browser',
    'chrome',
    '--isolated',
    '--headless',
  ],
});
try {
  await client.connect(transport);
  const result = await client.callTool(
    {
      name: 'browser_run_code_unsafe',
      arguments: {
        code: `async (page) => {
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
        const assert = (value, message) => { if (!value) throw new Error(message); };
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(${JSON.stringify(base)});
        await page.getByRole('heading', { name: 'Muhammad Abdullah', exact: true }).waitFor();
        await page.waitForTimeout(1200);
        const close = page.getByRole('button', { name: 'Close timeline', exact: true });
        if (await close.count()) await close.click();
        const studio = await page.locator('[data-mtl-registry]').count();
        assert(studio === 0, 'Unexpected paid Studio overlay');
        const homeImages = await page.locator('main img').all();
        for (const img of homeImages) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate(async (el) => { await el.decode(); if (!el.naturalWidth) throw new Error('Image did not load: ' + el.getAttribute('src')); });
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.locator('.hero-canvas canvas').waitFor({ timeout: 30000 });
        await page.waitForFunction(() => {
          const canvas = document.querySelector('.hero-canvas canvas');
          const container = document.querySelector('.hero-canvas');
          return canvas && container && container.clientWidth > 350 && canvas.width >= container.clientWidth - 2 && canvas.height >= container.clientHeight - 2;
        });
        const drawingBuffer = await page.locator('.hero-canvas canvas').evaluate(el => ({ width: el.width, height: el.height }));
        assert(drawingBuffer.width > 0 && drawingBuffer.height > 0, 'Desktop sculpture has no drawing buffer');
        await page.waitForTimeout(300);
        await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });
        const accessibility = [];
        const checkAccessibility = async (slug) => {
          await page.addScriptTag({ content: ${JSON.stringify(axeSource)} });
          const audit = await page.evaluate(async () => await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } }));
          accessibility.push({ route: slug, violations: audit.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
          assert(audit.violations.length === 0, 'Accessibility: ' + slug + ' ' + JSON.stringify(accessibility.at(-1).violations));
        };
        await checkAccessibility('/');
        for (const width of [320, 360, 390, 768, 1024, 1440]) {
          await page.setViewportSize({ width, height: 900 });
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Home overflow at ' + width);
        }
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.getByRole('button', { name: 'Pause sculpture animation' }).click();
        await page.getByRole('button', { name: 'Play sculpture animation' }).waitFor();
        assert(await page.getByRole('button', { name: 'Play sculpture animation' }).getAttribute('aria-pressed') === 'true', 'Sculpture did not pause');

        await page.setViewportSize({ width: 390, height: 844 });
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Mobile horizontal overflow');
        const toggle = page.locator('nav button');
        await toggle.click();
        await page.waitForFunction(() => document.querySelector('nav button')?.getAttribute('aria-expanded') === 'true');
        assert(await toggle.getAttribute('aria-expanded') === 'true', 'Mobile menu did not open');
        await page.keyboard.press('Escape');
        await page.waitForFunction(() => document.querySelector('nav button')?.getAttribute('aria-expanded') === 'false');
        assert(await toggle.getAttribute('aria-expanded') === 'false', 'Escape did not close mobile menu');
        await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto(${JSON.stringify(base + '/projects/guardiansense')});
        await page.locator('#architecture-sequence').scrollIntoViewIfNeeded();
        assert(await page.locator('canvas').count() === 0, 'Case study should not load WebGL');
        assert(await page.getByRole('heading', { name: /Accelerometer & gyroscope data/ }).isVisible(), 'Architecture description missing');
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.goto(${JSON.stringify(base + '/projects/guardiansense')});
        await page.screenshot({ path: 'test-results/case-study-desktop.png', fullPage: true });
        await page.locator('.case-flow-node').nth(2).click();
        await page.waitForFunction(() => document.querySelector('.case-flow-node[aria-current="step"]')?.getAttribute('href') === '#stage-03');
        for (const slug of ['guardiansense', 'check-inn', 'disease-prediction', 'spare-parts']) {
          await page.goto(${JSON.stringify(base)} + '/projects/' + slug);
          await checkAccessibility('/projects/' + slug);
          assert(await page.locator('.case-flow-stage').count() === 4, 'Missing stages on ' + slug);
          assert(await page.locator('.case-decisions article').count() === 3, 'Missing implementation decisions');
          for (const width of [320, 360, 390, 768, 1024, 1440]) {
            await page.setViewportSize({ width, height: 900 });
            assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Case study overflow: ' + slug + ' at ' + width);
          }
        }
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(${JSON.stringify(base + '/projects/guardiansense')});
        await page.screenshot({ path: 'test-results/case-study-mobile.png', fullPage: true });
        const staticContext = await page.context().browser().newContext({ javaScriptEnabled: false });
        const staticPage = await staticContext.newPage();
        await staticPage.goto(${JSON.stringify(base + '/projects/guardiansense')});
        assert(await staticPage.locator('.case-flow-stage').count() === 4, 'No-JavaScript architecture missing');
        assert(await staticPage.getByRole('heading', { level: 1 }).isVisible(), 'No-JavaScript project title hidden');
        await staticPage.goto(${JSON.stringify(base)});
        assert(await staticPage.getByRole('heading', { level: 1 }).isVisible(), 'No-JavaScript home title hidden');
        await staticPage.setViewportSize({ width: 390, height: 844 });
        assert(await staticPage.locator('.no-js-navigation a').first().isVisible(), 'No-JavaScript mobile navigation missing');
        const fallbackBounds = await staticPage.locator('.no-js-navigation').boundingBox();
        const heroBounds = await staticPage.locator('.hero-role').boundingBox();
        assert(fallbackBounds.y + fallbackBounds.height <= heroBounds.y, 'No-JavaScript navigation overlaps hero');
        await staticContext.close();
        assert(errors.length === 0, 'Browser errors: ' + errors.join('; '));
        return { passed: true, production: ${production}, studio, desktop: '1440x900', mobile: '390x844', reducedMotion: 'readable architecture', caseStudy: 'four routes; six widths; stage anchors; loaded images; no JavaScript', drawingBuffer, accessibility, consoleErrors: errors };
      }`,
      },
    },
    undefined,
    { timeout: 180000 },
  );
  for (const item of result.content ?? [])
    if (item.type === 'text') {
      const output = item.text.split('### Ran Playwright code')[0];
      console.log(output);
    }
  if (result.isError) process.exitCode = 1;
} finally {
  await client.close();
}
