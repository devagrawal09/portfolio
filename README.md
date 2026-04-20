# Portfolio website

The portfolio now runs as a single **SolidStart v2** app at the repo root and deploys to **Netlify**.

Legacy Gatsby code has been removed from the working tree. If any old content/assets are needed later, use git history.

---

## Local development

```bash
npm install
npm run dev
```

Typical local URL:

```text
http://127.0.0.1:4173/
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run format:check
npm run verify
```

To fix formatting:

```bash
npm run format
```

## Production build

```bash
npm run build
npm run start
```

Requires Node 20+.

## Netlify deployment

Deployment is configured from the repo root via `netlify.toml`.

- build command: `npm run build`
- publish directory: `.output/public`
- runtime target: Nitro Netlify preset via `vite.config.ts`
- Node version: `20`

Useful local verification command:

```bash
netlify build
```

## Planning / content sources

- `backlog.md` — rewrite plan + iteration log
- `resume.md` — structured career source material
- `appearances.md` — speaking / appearances source material
