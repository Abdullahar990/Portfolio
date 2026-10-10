# Muhammad Abdullah — developer portfolio

An editorial portfolio for a full-stack AI developer in Lahore, built with Next.js App Router, React and strict TypeScript. The home page introduces the developer, selected work, experience, skills and course certificates. Four case studies explain the projects through readable narratives and lightweight system diagrams.

The site uses a warm paper, ink and rust palette, server-rendered reading content, responsive layouts and reduced-motion fallbacks. An original Three.js sculpture is progressively loaded on the home page. All animation tools used by the site are free; Motion Studio and subscription-based editing are not required.

## Run locally

Use Node.js 24 LTS and npm. The lockfile is the source of truth for package versions.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). On this workspace's Mac, the verified local runtime is also available without changing the system Node installation:

```sh
export PATH="$PWD/.tools/node-v24.21.0-darwin-arm64/bin:$PATH"
```

The normal development command uses Turbopack. `npm run dev:webpack` is available when Webpack is needed. Stop the current development server before switching bundlers.

## Verify and build

```sh
npm run verify
npm start
```

`verify` runs TypeScript, ESLint, formatting, a production build and the production asset scan. Production builds use Webpack. With the production server running, the browser checks can be run separately:

```sh
TEST_BASE_URL=http://localhost:3000 TEST_PRODUCTION=1 npm run test:browser
TEST_BASE_URL=http://localhost:3000 npm run check:site
```

The browser script uses the actual Playwright MCP server. It checks content, responsive layouts, keyboard interactions, architecture links, reduced motion and browser console errors. Verification artifacts go into the ignored `test-results/` directory.

## Project structure

```text
src/
  app/                       Pages, metadata routes and global styles
  components/
    sections/                Home page sections
    projects/                Conceptual covers and architecture flow
    three/                   Progressive 3D visual and scene utilities
    ui/                      Navigation, footer and shared headings
  scenes/                    Original home page sculpture
  data/                      Projects, experience and course certificates
  hooks/                     Media queries and lifecycle utilities
  lib/                       Shared types, site identity and SEO helpers
  animations/                Optional smooth scrolling utility
public/                      Portrait, project illustrations and résumé
scripts/                     Browser, SEO and production verification
```

Edit `src/data/projects.ts` for case study content. Each project includes its summary, implementation, architecture stages, scope and next iteration. The image assets on the home page are project illustrations; the case study covers are conceptual diagrams, not screenshots of deployed products.

The selected projects are [Guardian Sense](https://github.com/Abdullahar990/GuardianSense), [Check INN, Chill Out](https://github.com/Abdullahar990/check-inn-chill-out), [Disease Prediction System](https://github.com/Abdullahar990/Disease-Prediction-App) and [Spare Parts Management](https://github.com/Abdullahar990/Spare-Parts-Management-System). Case studies distinguish demonstrated functionality from proposed improvements. Owner-provided experience figures and reported Guardian Sense benchmarks are retained.

## Deploy

Use Vercel's Next.js preset with Node.js 24, `npm ci` and `npm run build`. Set the server-only `SITE_URL` environment variable to the real public origin when using a custom domain. On Vercel, the production hostname provides the fallback; preview deployments remain non-indexable. The site does not require API credentials to run.

Follow the [deployment guide](docs/DEPLOYMENT.md) for URL configuration, environment variables and release checks. Keep credentials out of source, `NEXT_PUBLIC_*` variables and git history.

## Design and development notes

- [Deployment readiness plan](docs/DEPLOYMENT-READINESS-PLAN.md)
- [Home page design plan](docs/DESIGN-PLAN.md)
- [Project page design plan](docs/PROJECT-PAGE-PLAN.md)
- [Development environment and MCP status](docs/DEVELOPMENT.md)

MCP tools are development services configured in Codex, separate from the deployed website. Some integrations need account authentication and a Codex reload; configuration alone is not proof that a server is working.
