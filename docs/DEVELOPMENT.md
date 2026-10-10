# Portfolio development environment

The portfolio uses Next.js App Router, strict TypeScript, React, Tailwind v4, Three.js, React Three Fiber, Drei and the free MIT-licensed Motion library. No paid animation service, subscription, Motion Studio panel or companion editor server is needed.

## Local commands

A SHA-256-verified official Node 24.21.0 LTS runtime is installed in the ignored `.tools` directory. Homebrew's parallel installation failed due to its OpenSSL dependency lock, so the system Node remains unchanged.

```sh
export PATH="$PWD/.tools/node-v24.21.0-darwin-arm64/bin:$PATH"
npm ci
npm run dev
```

Open http://localhost:3000. Alternatively use your own Node 24 installation (`.nvmrc` specifies 24).

```sh
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run check:production
npm start
```

`npm run dev` uses Turbopack. `npm run dev:webpack` provides Webpack. Production builds use Webpack, retaining the project's original build mode. Stop the active dev server before changing bundlers.

## Design and architecture

See [the redesign plan](DESIGN-PLAN.md) for the visual direction and acceptance criteria.

```text
src/
  app/                     App Router pages, metadata, global responsive styles
  components/
    sections/              Hero, Projects, About, Work, Skills, Certifications, Contact
    ui/                    Navigation, SectionHeading and Footer
    projects/              ProjectCover and scroll-aware ArchitectureFlow
    three/                 HeroVisual, Canvas and model utilities
  scenes/                  HeroSculpture (homepage only)
  animations/              Optional Lenis + GSAP synchronization utility
  data/                    Projects, experiences, certifications and pipelines
  hooks/                   Reactive media queries and lifecycle utilities
  lib/                     Shared TypeScript types
  assets/shaders/          Future shader sources
public/
  models/                  Future GLB/glTF assets
  textures/                Future optimized textures
scripts/                   Real MCP protocol and browser verification
```

Homepage reading content is server-rendered and visible before hydration. Animation never gates section visibility. The free 3D hero is generated from primitives, dynamically imported near the viewport, and removed outside it. Animation pauses when the document is hidden. Rendering caps DPR at 1.5 on larger screens; phones use the CSS sculpture. A pause control stops automatic animation. Reduced-motion users also get the CSS sculpture instead of decorative WebGL.

Case-study architecture is server-rendered HTML with a sticky logical flow diagram on desktop. IntersectionObserver highlights the stage being read; links use native anchors. There is no project WebGL, pinned timeline or scroll hijacking. The responsive layout uses native scrolling, accessible focus states, a skip link and a keyboard-operable mobile menu with a no-JavaScript fallback.

`SmoothScroll` remains an optional Lenis wrapper, disabled by default. Do not combine it with `ScrollTrigger.normalizeScroll`. Spline and a direct Zustand dependency are deferred until the actual design requires them.

## Verification

```sh
TEST_BASE_URL=http://localhost:3000 npm run test:browser
# After building and starting the production app:
TEST_BASE_URL=http://localhost:3000 TEST_PRODUCTION=1 npm run test:browser
```

The browser script calls Microsoft's actual Playwright MCP server. It checks desktop/mobile content, horizontal overflow, keyboard navigation, reduced-motion and no-JavaScript fallbacks, animation pause, five viewport widths, stage anchors, automated WCAG accessibility checks, absence of Studio and console errors. Screenshots are saved under ignored `test-results/`.

The source/output scan runs with `npm run check:production` after a build. It rejects Studio runtime markers, panel injection and companion-server URLs in production assets.

## MCP status and authentication

The user-level `~/.codex/config.toml` retains existing model/trust settings and has a timestamped backup. Local browser servers are project dev dependencies and use the verified Node 24 runtime. A fresh Codex session/IDE reload is required to expose newly configured MCP tools in the current chat. `codex mcp list` confirms registration, not tool functionality.

- **Playwright:** Microsoft `@playwright/mcp`; real browser calls verified.
- **Chrome DevTools:** official `chrome-devtools-mcp`; browser navigation and console inspection verified. Isolated headless profile; usage statistics and CrUX calls disabled.
- **Context7:** Upstash's hosted server; library resolution and Next.js documentation retrieval verified without an API key.
- **Figma:** official hosted endpoint; OAuth sign-in completed. Tool use in Codex needs verification after reloading.
- **GitHub:** official hosted endpoint; requires `GITHUB_PERSONAL_ACCESS_TOKEN` in the environment launching Codex, scoped to the needed repositories. Do not put this token in application/client variables or commit it. The GitHub plugin authorization flow is an alternative integration.
- **Filesystem:** unnecessary for this project because Codex already provides controlled filesystem tools; no duplicate filesystem server installed.

Diagnostic sessions use the real MCP SDK. Send one JSON tool call per line, followed by `exit`:

```sh
node scripts/mcp-session.mjs playwright
node scripts/mcp-session.mjs chrome_devtools
node scripts/mcp-session.mjs context7
```

No API keys are required to run the portfolio. `.env.example` contains guidance only. Private credentials belong in `.env.local`, Codex's secure storage or your launch environment, never `NEXT_PUBLIC_*` variables.

## Official references

- [Motion MIT license](https://github.com/motiondivision/motion/blob/main/packages/motion/README.md)
- [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/installation)
- [Codex MCP configuration](https://developers.openai.com/codex/mcp)
- [Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Context7](https://github.com/upstash/context7)
- [GitHub MCP for Codex](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-codex.md)
- [Figma remote MCP](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)

Project pages use lightweight, server-rendered flow diagrams instead of WebGL. The full design decision and verification scope are in [PROJECT-PAGE-PLAN.md](./PROJECT-PAGE-PLAN.md).
