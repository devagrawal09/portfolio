# Portfolio website [![Build Status](https://travis-ci.com/devagrawal09/portfolio.svg?branch=master)](https://travis-ci.com/devagrawal09/portfolio)

This website is built with [Gatsby](https://www.gatsbyjs.org/) and hosted [here](http://devagr.me/).

---

## Rewrite (SolidStart v2)

A fresh rewrite is in progress in the `rewrite/` directory. The legacy Gatsby site remains untouched until the new site is ready to launch.

Deployment target for the rewrite: **Netlify**.

See [`backlog.md`](./backlog.md) for the full plan and iteration log.

### Run the rewrite locally

```bash
cd rewrite
npm install        # or pnpm install
npm run dev        # starts Vite dev server (typically http://localhost:5173)
```

### Rewrite quality checks

```bash
npm run typecheck
npm run lint
npm run format:check
npm run verify     # runs typecheck + lint + format check
```

To fix formatting:

```bash
npm run format
```

To build for production:

```bash
npm run build
npm run start
```

Requires Node 20+.

### Netlify deployment notes

The repo still contains the legacy Gatsby site at the root, but the in-progress rewrite deploys from `rewrite/`.

- Root `netlify.toml` sets `base = "rewrite"` and runs the SolidStart build there.
- `rewrite/vite.config.ts` uses Nitro's Netlify preset for the SolidStart SSR output.
- `NETLIFY_SKIP_GATSBY_BUILD_PLUGIN=true` is set to stop Netlify from auto-injecting the Gatsby build plugin while this mixed Gatsby + SolidStart repo is in transition.

Useful local verification command:

```bash
netlify build --offline
```
