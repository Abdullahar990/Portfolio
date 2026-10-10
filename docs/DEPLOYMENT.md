# Deploying the portfolio to Vercel

The application is prepared for Vercel's Next.js runtime. It has not been published automatically.

## Prepare a release

Use Node.js 24 LTS (`.nvmrc`) and npm. The project-local macOS runtime under `.tools/` is a local convenience and is not committed or needed by Vercel.

```sh
npm ci
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run check:production
```

The production build preserves the project's Webpack build command. Vercel should use the **Next.js** framework preset, `npm ci` for installation and `npm run build` for its build command. Keep the output directory at the framework default. Choose Node.js **24.x** in the project settings.

## Public URL and indexing

Set the server-side environment variable `SITE_URL` to the complete public origin, for example your actual `https://` custom domain. Do not use a preview deployment URL, a URL path, or a guessed domain. No `NEXT_PUBLIC_` variable or API key is required.

If `SITE_URL` is absent, the application uses Vercel's `VERCEL_PROJECT_PRODUCTION_URL` system variable, which identifies the stable production domain. Enable Vercel system environment variables if your project does not expose it. A Vercel production build with neither value fails with a clear configuration error.

The URL determines the canonical links, sitemap, social image URLs and structured data at build time. Set it in Vercel before building and redeploy after changing your primary domain. Ensure that the Vercel domain settings redirect alternative domains to the chosen primary domain.

Vercel preview deployments have `noindex, nofollow` metadata and disallow crawling. Their canonical links still point to the configured production origin. Local builds without a public URL remain non-indexable and omit canonical links; they do not invent a public address. Sitemap entries are published only for an indexable production build.

## Verify the production app

```sh
npm start
# In a second terminal:
TEST_BASE_URL=http://localhost:3000 TEST_PRODUCTION=1 npm run test:browser
TEST_BASE_URL=http://localhost:3000 npm run check:site
```

When a public origin was configured at build time, pass the same `SITE_URL` to `check:site`. This verifies the built canonical URLs rather than assuming they match localhost. The browser checks exercise all case studies, responsive layouts, reduced motion, no-JavaScript content and console errors.

After deployment, check the public home page, all four case studies, `/robots.txt`, `/sitemap.xml`, and the `/social/home` sharing image. Confirm that production pages can be indexed and preview pages cannot. Submit the production sitemap to Search Console if you want indexing reports. No search ranking or real-user performance score is guaranteed by local checks.

## Credentials and owner actions

The website needs no private credentials to run. Keep future secrets in Vercel's environment settings and `.env.local`, never in committed source or browser variables. MCP authentication belongs to Codex and is independent of deployment.

A historical image-compression script contained a third-party API key. The current source removes that key, but the repository history may still contain it. Revoke or rotate the key in the provider account before sharing the repository or deploying. Rotation is an account action for the owner; no Git history has been rewritten.

Publishing, adding your domain, and any account authorization remain owner actions. Connect the repository to your Vercel account, apply the settings above, review the preview, and promote the verified release.

Official references: [Next.js metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [structured data](https://nextjs.org/docs/app/guides/json-ld), and [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables).
