# Project case-study redesign

## Diagnosis
The oversized stock photograph, detached dark 3D widget and repeated technical paragraphs obscure the project narrative. Rotating generic modules do not explain the actual system. Readers need a clear reason for the project, its working flow and its implementation choices.

## Design decision
Use an editorial technical case study, not a 3D showcase. Keep the homepage sculpture. Replace project WebGL with lightweight, bespoke DOM/SVG architecture diagrams. Illustrations are explicitly schematic, never presented as screenshots or live telemetry. Preserve existing project facts without inventing outcomes.

## Page composition
1. Compact navigation and a split hero: category/year, title, plain-language summary and source link beside a project-specific schematic. A fine-rule facts strip follows.
2. An overview with generous readable typography and a small contents rail.
3. A numbered architecture narrative. Desktop has a sticky flow figure alongside four full stage descriptions. IntersectionObserver highlights the currently read stage; links let readers jump to a stage. No pinned timelines, forced scroll distances, WebGL or hidden content. Mobile stacks the diagram before the narrative. Reduced motion disables smooth scrolling and transitions.
4. Implementation decisions in three numbered editorial columns, then a compact technology list.
5. A generous next-project link and return navigation.

## Visual direction
Warm ivory, charcoal text and rust accents, with dark olive restricted to the hero illustration. Generous headings, readable 15–17px body text, thin rules and no glass cards. Diagram labels match the actual project's stages. Avoid stock photography as a surrogate for product screenshots.

## Verification
Check all four case-study routes, diagram navigation and scroll highlighting, 360/390/768/1024/1440px widths, reduced motion, no-JavaScript readability, browser errors, lint, TypeScript and production build. Confirm no Studio instrumentation.

## Completed verification
- All four case-study routes passed Playwright checks in development and production.
- No horizontal overflow at 360, 390, 768, 1024 or 1440px.
- Stage anchors and scroll highlighting passed.
- Reduced-motion and JavaScript-disabled views retain readable architecture content.
- Desktop/mobile screenshots reviewed; no browser console errors.
- Strict TypeScript, ESLint, Prettier and production build passed.
- Production assets contain no Motion Studio panel, runtime markers or companion-server URLs.
