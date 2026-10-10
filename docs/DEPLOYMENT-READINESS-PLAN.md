# Portfolio quality and deployment plan

## Scope and design decisions
Preserve the existing warm editorial identity and its project architecture narrative. Improve the quality of the entire site rather than introducing another visual direction. Prepare for Vercel; publishing is a separate owner action.

### Palette: every color has a job
| Token | Color | Purpose |
| --- | --- | --- |
| Paper | #f3f2ed | Main reading surface; a warm neutral with high text contrast. |
| Ink | #242922 | Headings, navigation and primary actions; establishes hierarchy. |
| Muted ink | #5c6356 | Secondary reading content and labels, still meeting normal-text contrast. |
| Surface | #e8e8df | Distinguishes technical figures from the main narrative without heavy cards. |
| Rust | #a84429 | Links, focus, active diagram stage and small identity accents; never the only state indicator. |
| Deep olive | #293227 | Hero illustrations, contact and next-project actions; concentrates dark surfaces where they matter. |
| Light ink | #f0f0e6 | Reading on dark olive. |
| Muted light | #c0c9b3 | Secondary reading on dark olive. |
| Copper | #d79870 | Dark-surface diagram accents and focus indicators. |
| Rule | #d0d3c8 | Decorative section separation; interactive controls use a darker boundary. |

## Implementation order
1. **SEO and identity**: centralized site facts and URL resolution; unique home/project titles and descriptions; production canonicals; per-page Open Graph/Twitter cards; favicon and touch icon; sitemap and robots; truthful Person/WebSite/CreativeWork/Breadcrumb structured data. Vercel preview deployments stay non-indexable. Use a configured custom URL or Vercel's production host, never invent a domain.
2. **Reading and content**: readable 15–17px prose and larger utility labels; comfortable line lengths and spacing; project-specific overview headings; simplify dense prose while preserving supplied facts; correct hashing terminology and certificate descriptions; distinguish profile links from actual repository links; align README with current source.
3. **Visual and accessibility quality**: semantic color tokens; normal-text contrast checks; keyboard focus, anchor offsets, 44px key controls, mobile navigation without JavaScript, hidden decorative SVGs; graceful 404 page; architecture stage state conveyed by label/border as well as color.
4. **Performance**: retain server-rendered text and diagrams; lazy decorative WebGL; cap DPR; pause rendering offscreen/background; offer a pause control; static reduced-motion/mobile fallbacks where appropriate; optimized local imagery and self-hosted Next fonts. Remove unused duplicate packages only after import checks.
5. **Deployment hygiene**: eliminate hardcoded image-processing credentials, keep private env vars server-side, document key rotation; deterministic npm lockfile and Node 24; Vercel configuration/defaults; useful security headers; CI for lint/type/format/build/production scans; document runtime, canonical configuration and deployment steps.
6. **Verification**: check all pages, 404, social images, sitemap, robots, structured data and headers against the production server; Playwright responsive checks (360/390/768/1024/1440px), keyboard navigation, reduced motion, no-JavaScript content, stage anchors, console failures; automated accessibility/Lighthouse audits and local performance measurements. Fix concrete failures before handoff.

## Acceptance and reporting
Report measured results, not ranking or accessibility guarantees. Local performance measurements are lab results, not real-user Core Web Vitals. Deployment readiness requires a passing production build and checks, no exposed credentials in the working tree, correct production URL resolution and clear owner steps. A missing custom domain is handled by Vercel environment variables. The exposed historical image-processing key must be rotated by the owner. Do not fabricate a public deployment or silently publish the site.

## Verified text contrast

| Foreground / background | Ratio |
| --- | --- |
| Ink / paper | 13.24:1 |
| Muted ink / paper | 5.55:1 |
| Muted ink / surface | 5.05:1 |
| Rust / paper | 5.32:1 |
| Rust / surface | 4.84:1 |
| Light ink / olive | 11.59:1 |
| Muted light / olive | 7.75:1 |
| Copper / olive | 5.45:1 |

These text pairs exceed the WCAG AA normal-text minimum of 4.5:1. Decorative rules and geometry are not reading text. Automated browser audits also check actual rendered color combinations. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
