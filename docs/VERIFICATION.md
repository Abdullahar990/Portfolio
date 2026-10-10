# Release verification

This report records checks run against the current deployment-readiness changes. A check is not considered passed until its result is recorded below. Local measurements do not guarantee search rankings or real-user Core Web Vitals.

## Current release checks

| Check | Result | Evidence |
| --- | --- | --- |
| TypeScript, lint and formatting | Passed | Strict TypeScript, ESLint with zero warnings, Prettier and git diff whitespace checks passed on the integrated source. |
| Production build and instrumentation scan | Passed | Next.js production Webpack build generated 17 static pages/metadata assets; Studio instrumentation scan passed. npm ci lockfile dry run passed. |
| Production metadata, social cards, sitemap, robots and 404 | Passed | `check:site` against `http://127.0.0.1:3101`: all five content routes, unique titles/descriptions, canonicals, OG/Twitter metadata, JSON-LD, page anchors, favicon/touch icon, five PNG cards at 1200×630, five sitemap entries, robots policy and two real 404s. Machine-readable evidence: ignored `test-results/site-check.json`. |
| Production security response headers | Passed | All five pages and two 404s returned nosniff, frame protection, referrer/permissions policy and base/object/frame CSP; no `X-Powered-By` header. |
| Browser responsiveness, keyboard and reduced motion | Passed | Playwright MCP against the final production server: all five pages at 320/360/390/768/1024/1440px, stage anchor/highlight, mobile menu/Escape, a correctly sized desktop WebGL drawing buffer and sculpture pause, reduced motion, loaded/decoded homepage images, zero console errors. Production desktop/mobile screenshots reviewed. |
| JavaScript-disabled content | Passed | Home heading, all four architecture stages and mobile navigation remain visible; fallback navigation does not overlap the hero. |
| Accessibility and local performance | Passed within tested scope | axe-core WCAG A/AA checks through Playwright MCP found zero violations on all five pages. Lighthouse accessibility/SEO/best-practices scores were 100 for home desktop/mobile and Guardian Sense mobile. Mobile performance trace: LCP 511ms, CLS 0.00 with CPU 4x and Fast 4G emulation on a warm localhost reload. These are lab measurements, not real-user performance or a conformance guarantee. |
| Optional image utility credential guard | Passed | `env -u TINIFY_API_KEY node compress-images.js` exited 1 before any API call; source check found no literal `tinify.key` assignment and no writes to original images. |
| Release HTTP test syntax and lint | Passed | Node syntax check and ESLint on `scripts/check-site.mjs`; no findings. |
| Production dependency audit | Passed | `npm audit --omit=dev --json` reported zero vulnerabilities. |
| Development dependency audit | Known limitation | Full `npm audit --json` reported five high-severity dependency records from one unpatched `braces` advisory in the Next.js ESLint dependency chain; no runtime dependency findings. |
| CI workflow execution on GitHub | Not run | Workflow is configured locally; no push or deployment was requested. |
| Public Vercel deployment | Not run | Deployment remains an owner action. |

## Known owner action

Rotate the historical image-processing key as described in [CREDENTIALS.md](CREDENTIALS.md). The current site needs no API token to run.

The [official braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) affects versions through 3.0.3 and lists no patched version. The public npm registry still reports 3.0.3 as latest. The affected development chain is `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`. npm proposes downgrading the Next.js lint configuration to 14.2.35; this was not applied because it would break version alignment with Next.js 16. Monitor the upstream fix and re-run the development audit when it is published.

## SEO test configuration

The HTTP checks used `VERCEL_PROJECT_PRODUCTION_URL=portfolio-verification.vercel.app` with `VERCEL_ENV=production` as an explicit test fixture. This is not the owner's chosen domain and does not claim an existing public deployment. A real Vercel build resolves the owner's actual production hostname or an explicitly configured `SITE_URL`.

## Audit artifacts and limits

The ignored `test-results/` folder contains production screenshots, `site-check.json`, three Lighthouse JSON reports and `release-summary.json`. Automated audits cover detectable issues; they do not prove full assistive-technology compatibility or search rankings. The measured performance trace used a warm local reload, so it is not a cold-load network benchmark. Check the actual public Vercel deployment after publishing. No deployment or GitHub CI run has been claimed.

The final desktop WebGL check waits for renderer sizing and verified a 504×448 drawing buffer, rather than accepting the canvas default 300×150 buffer. One upstream Three.js Clock deprecation warning is present when the desktop scene initializes; browser console errors remain zero.
