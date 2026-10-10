# Portfolio redesign plan

## Problem
The dark monitoring-console layout repeats small cards, low-contrast labels and delayed/scroll-dependent opacity. Development also opens the Motion Studio overlay. The first screen has too much empty space and gives projects little prominence.

## Direction: an editorial engineering portfolio
A warm paper canvas, charcoal typography, fine rules and a restrained rust accent. Use Space Grotesk for display text and Inter for reading. Large typography, deliberate spacing and asymmetric layouts give the content a clear hierarchy. Preserve the owner's real project, education, employment and certification details.

## Implementation order
1. Remove Motion Studio and its integration/companion command. Keep free Motion, Three.js, React Three Fiber and Drei. Core reading content must render visibly on the server and never rely on a successful animation or IntersectionObserver.
2. Rebuild navigation and hero: concise identity, large name, useful primary action, and a custom interactive 3D system sculpture built from primitives. No paid models or animation services. Provide a static fallback. Keep essential content outside the canvas.
3. Recompose projects as a large flagship case study plus three compact project rows with real screenshots and explicit case-study links.
4. Add a personal background with a portrait, an editorial experience list, readable skill categories, compact certification links and a direct contact section.
5. Bring project detail pages into the same visual language and retain their free Three.js pipeline scenes and static fallbacks.
6. Test 360/390px phones, 768px tablet and 1440px desktop; verify keyboard menu behavior, reduced motion, visible content without JavaScript, console errors, type checking, lint and a production build.

## Interaction rules
- Content is visible before hydration. Animate only decorative objects and small interaction feedback.
- Native scrolling and clear anchor navigation. No scroll hijacking.
- Hero geometry is lazy loaded, paused outside its viewport/when the tab is hidden, and capped at DPR 1.5 (1 on mobile).
- Reduced motion skips decorative WebGL. Canvas errors expose a CSS fallback; navigation and content stay usable.
- Mobile uses a single reading column, controls of at least 44px, no overflow and no cursor-only information.

## Success criteria
Every section can be read without waiting for an animation. Projects, resume and contact are easy to find. A consistent layout, authentic content and an original visual make the site feel deliberately designed. Production requires no subscription or companion editor server.
