# Portfolio Revamp Backlog

## Why this exists

The current portfolio is badly out of date in both **presentation** and **positioning**.

It does not reflect the current version of Dev:
- DevRel engineer / fullstack engineer
- Solid ecosystem contributor
- TanStack Start maintainer
- conference speaker / workshop host / podcast guest
- someone shipping modern demos, content, and OSS work

Right now the site still reads like an older student-era portfolio and undersells the last 2+ years of work.

---

## Current repo review

### Tech / implementation state
- Gatsby 4
- React 17
- Bootstrap 4.6
- mixed JS / TS
- content mostly in markdown + yaml
- about 2,054 LOC across 114 files (excluding dependencies)

### Repo / maintenance issues
- `package.json` still contains starter-template metadata
  - generic description
  - wrong author
  - wrong repository URL
  - wrong bugs URL
- branch layout is still centered on `master`
- README is nearly empty
- no real tests (`npm test` is placeholder)
- current install/build path is brittle on modern environments due to old native deps
  - `canvas@2.9.1`
  - Node 25 incompatibility
  - native build issues / `pkg-config` dependency

### Product / UX issues
- visual design feels old and template-driven
- coffee bean background actively hurts credibility
- homepage hero is generic and weak
- strongest proof is hidden below the fold or on secondary pages
- site feels autobiographical instead of outcome-focused
- navigation is based on old content buckets instead of current goals

### Content issues
- homepage still says "aspiring software architect and content creator"
- about page still frames Dev as a UC student / fifth-year IT major
- contact page emphasizes old social links and weak channels
- newer work in `resume.md` and `appearances.md` is much stronger than what the site surfaces
- current site does not centralize open source, talks, demos, or DevRel work

---

## Design review summary

### What is wrong
1. The current site communicates the wrong career stage.
2. The design looks like an old Bootstrap template rather than a modern engineer/devtools brand.
3. There is not enough proof of impact above the fold.
4. Too much of the site is organized like a scrapbook instead of a focused funnel.
5. The strongest differentiators — OSS, speaking, DevRel, architecture, demos — are underrepresented.

### What the new site should communicate
- modern fullstack / DevRel engineer
- builder of demos, systems, and educational content
- credible in the Solid / TanStack / local-first / async UI ecosystem
- available for speaking, collaboration, and interesting technical work

---

## Target rewrite direction

Rewrite the site in the **latest SolidStart v2 line**.

Reference:
- https://github.com/solidjs/solid-start/discussions/2119
- https://docs.solidjs.com/solid-start/migrating-from-v1

### Notes from the SolidStart roadmap discussion
Relevant takeaways from discussion #2119:
- Start v2 is already being used in production in real apps.
- The team explicitly wants Start v2 to be the stable incremental path before deeper Solid v2 ecosystem changes.
- User-facing APIs are expected to remain stable through beta/rc unless critical issues appear.
- For Start v1 users, migration mainly touches `vite.config.ts`, `tsconfig.json`, and optionally `createMiddleware`.
- Server Functions, Actions, and component code are not expected to be heavily impacted by the architecture shift.
- Start v2 will **not** drop support for Solid v1 while the ecosystem catches up.
- New app bootstrap command called out in the discussion: `pnpm create solid --start --v2`

### Practical implication for this repo
This portfolio is not a Start v1 app; it is a Gatsby app. So this should be treated as a **clean rewrite**, not a framework migration.

That means:
- do not preserve Gatsby architecture unless the content model is still useful
- keep the content, messaging, and information architecture that still matter
- rebuild the UX, routing, data flow, and styling from scratch in SolidStart
- favor modern SolidStart patterns over trying to mimic the current site

---

## Product goals for the new site

1. Make the site feel current within 5 seconds.
2. Clearly position Dev as a modern engineer / DevRel / OSS contributor.
3. Surface credibility above the fold.
4. Make it easy for recruiters, conference organizers, and collaborators to understand the value quickly.
5. Reduce maintenance overhead so the site can actually stay current.
6. Make the site itself a proof point for modern stack choices.

---

## Suggested IA / nav

Top-level nav candidate:
- Home
- Work
- Talks
- Open Source
- Writing
- About
- Contact

Alternative leaner nav:
- Home
- Projects
- Talks
- Writing
- About
- Contact

Preferred homepage section order:
1. Hero
2. Proof bar
3. Featured work
4. Talks / appearances highlights
5. Open source / ecosystem work
6. Writing highlights
7. CTA footer

---

## 20 improvement ideas

### 1. Rewrite the positioning completely
Replace the student-era framing with a current one:
- DevRel engineer
- systems-focused fullstack engineer
- OSS maintainer / contributor
- speaker and educator

### 2. Replace the homepage with a strong modern hero
Hero should answer:
- who Dev is
- what Dev does
- what ecosystems / problems he works in
- why people should care

### 3. Add a proof bar above the fold
Examples:
- PowerSync DevRel
- Solid core team / contributor
- TanStack Start maintainer
- conferences / podcasts count
- OSS / demos / content metrics if useful

### 4. Make the site outcome-focused, not autobiography-focused
Use stronger framing around shipped work, impact, talks, demos, and OSS.

### 5. Curate a smaller set of featured work
Do not give equal weight to every historical project.
Show a handful of the best, most current, most strategic pieces.

### 6. Add a real talks / appearances page
Use `appearances.md` as source material and turn it into a polished, filterable, high-credibility page.

### 7. Add an open source page
Highlight:
- Solid ecosystem work
- TanStack Start
- authored libraries
- core contributions
- ecosystem influence

### 8. Build better case-study pages for selected work
Each flagship project should explain:
- problem
- role
- constraints
- architecture / tradeoffs
- outcome
- links / screenshots

### 9. Turn resume content into web-native content
Do not hide the strongest experience in a PDF.
Create structured sections for roles, impact, and current focus.

### 10. Remove or demote weak / outdated social links
Prioritize GitHub, LinkedIn, YouTube, X, and email.
Avoid emphasizing Facebook / Instagram-era personal-site patterns.

### 11. Redesign the visual system from scratch
Remove the coffee background and old Bootstrap vibe.
Choose a modern direction:
- dark devtools aesthetic
- editorial creator aesthetic
- hybrid premium technical portfolio

### 12. Use SolidStart as a product-quality foundation
The site should itself communicate modern technical taste and ecosystem alignment.

### 13. Add a lightweight "Now" section
Show current focus:
- what Dev is building
- what Dev is learning
- current talk / content topics
- current work themes

### 14. Add speaking and hiring pathways
Two explicit CTA tracks:
- invite me to speak
- work with me / contact me

### 15. Curate writing instead of dumping a blog archive
Feature the best technical pieces and organize by themes that reinforce the brand.

### 16. Add better metadata / social cards / SEO
Pages should rank and preview well for:
- name
- talks
- OSS work
- ecosystem topics
- devrel / fullstack positioning

### 17. Add analytics around meaningful actions
Track:
- featured work clicks
- contact clicks
- resume clicks
- talk page clicks
- external profile clicks

### 18. Make content updates easy
Use markdown/content collections or a simple typed data model so roles, talks, and projects stay current.

### 19. Add one memorable interaction
Ideas:
- interactive timeline
- talks map
- OSS graph
- animated architecture vignette
- live "currently exploring" section

### 20. Build for credibility on first contact
Everything above the fold should help a recruiter, founder, or organizer think:
"this person is current, credible, and worth talking to."

---

## Recommended design direction

Preferred direction: **hybrid interactive technical portfolio**

Desired qualities:
- modern and sharp
- personal but not bloggy
- technically credible
- content-forward without being text-heavy
- premium motion and polish, but restrained

Avoid:
- template vibes
- generic "welcome to my portfolio" copy
- too much biography too early
- equal emphasis on outdated projects
- decorative visuals unrelated to engineering identity

---

## Core messaging ideas

### Hero direction candidates
1. Building demos, systems, and developer experiences for the modern web.
2. DevRel engineer shipping fullstack demos, technical content, and open source work.
3. I build and explain modern web systems — from product demos to framework-level ideas.

### Supporting proof themes
- async UI
- local-first / realtime ideas
- framework ecosystem work
- fullstack architecture
- developer tooling / demos / education

## Research synthesis — practical portfolio recommendations

### What strong developer portfolios consistently do
- communicate current positioning within ~5 seconds
- use typography, spacing, and contrast to feel premium before relying on motion
- surface proof above the fold instead of hiding credibility in secondary pages
- curate a small number of strong projects instead of dumping every historical artifact
- make it obvious how to contact, collaborate, or invite the person to speak

### Recommended visual direction for this rewrite
- Primary reference blend: **70% Vercel / Linear**, **20% Stripe/editorial**, **10% tasteful motion**
- Desired feel: modern devtools/product-engineer aesthetic with crisp typography, restrained color, subtle gradients, premium spacing, and light editorial polish
- Motion should support hierarchy and delight, not become the main event
- Borrow polish from Awwwards-style sites without copying their self-indulgent complexity or maintenance burden

### Homepage execution rules
- Hero must answer: who Dev is, what Dev does, what ecosystems/problems he works in, and why he is credible
- Proof bar should stay above the fold and emphasize PowerSync, Solid ecosystem work, TanStack Start, and speaking/community proof
- Homepage should prioritize: hero -> proof bar -> featured work -> talks highlights -> OSS highlights -> writing highlights -> dual CTA footer
- Keep CTAs focused on the two highest-value paths: **speaking** and **collaboration / contact**
- Featured work should favor 3-5 flagship items with architecture/outcome framing over broad archives

### Visual system guidance
- Typography and spacing are higher leverage than flashy animation
- Use one restrained accent color plus a mostly neutral palette
- Screenshots, cards, and proof blocks should look product-quality and consistent
- Prefer subtle borders, structured cards, and premium whitespace over decorative backgrounds
- The design should read like "current, credible, technically sharp" rather than "portfolio template" or "motion demo"

### Anti-patterns to avoid
- generic "welcome to my portfolio" copy
- old-template vibes or decorative imagery unrelated to engineering identity
- giant autobiography sections near the top of the site
- equal emphasis on outdated or weak projects
- too many colors, too many CTAs, or too many social links
- heavy motion that hurts comprehension, performance, or maintainability
- dumping blog archives instead of curating the writing that reinforces the brand

---

## Rewrite backlog

## Phase 0 — foundation / decisions
- [x] Decide final brand position and homepage messaging
- [ ] Decide final information architecture
- [x] Decide visual direction / references
- [ ] Decide content source strategy (markdown, mdx, typed data, or mixed)
- [x] Decide deployment target for SolidStart app
- [ ] Decide whether to preserve any legacy URLs for SEO

## Phase 1 — bootstrap the new app
- [x] Create a fresh SolidStart v2 app using the current recommended setup
- [x] Add TypeScript, linting, formatting, and project conventions
- [x] Set up app shell, routing, layout, and metadata strategy
- [x] Set up a design system foundation (tokens, spacing, typography, color)
- [x] Add analytics and structured metadata scaffolding

## Phase 2 — content modeling
- [ ] Inventory what existing content should be kept, rewritten, or deleted
- [x] Convert `resume.md` into structured website content
- [x] Convert `appearances.md` into structured talks data
- [x] Curate featured projects and case studies
- [x] Curate writing highlights
- [x] Create a central profile/contact config

## Phase 3 — homepage
- [x] Build hero section
- [x] Build proof bar
- [x] Build featured work section
- [x] Build talks highlights section
- [x] Build OSS highlights section
- [x] Build writing highlights section
- [x] Build CTA footer

## Phase 4 — secondary pages
- [x] Work / Projects page
- [x] Talks / Appearances page
- [x] Open Source page
- [x] Writing page
- [x] About page
- [x] Contact page
- [x] 404 page

## Phase 5 — polish / credibility
- [x] Add custom OG images / social cards
- [ ] Add subtle motion and interaction polish
- [x] Improve large-screen layout density so wide desktop screens use horizontal space intentionally
- [x] Fix mobile header spacing so the first nav link does not crowd the site name
- [x] Fix small-screen proof-bar/stat wrapping, especially the `DevRel` / `PowerSync` item
- [x] Add accessibility review pass
- [ ] Add performance review pass
- [x] Add responsive review pass
- [x] Add SEO review pass

## Phase 6 — cleanup / launch
- [x] Remove old Gatsby-specific code and assets once replacement is ready
- [ ] Preserve or redirect legacy routes where useful
- [x] Update README with local setup and deployment notes
- [ ] Final content sweep for stale claims / broken links
- [ ] Launch the new site

---

## Iteration log

### Iteration 1 — 2026-04-19
**Completed:** Phase 1, item 1 — bootstrapped a fresh SolidStart v2 app in `rewrite/`

- Created `rewrite/` directory at repo root (legacy Gatsby site untouched)
- Scaffolded `package.json`, `tsconfig.json`, and `app.config.ts` (vinxi/v1 conventions — later corrected)
- Added `src/app.tsx` (root layout / HTML shell)
- Added `src/routes/index.tsx` with a branded homepage shell using backlog hero messaging
- Applied minimal inline CSS: dark devtools aesthetic, hero + proof bar above the fold
- Added run instructions to `README.md`

**Not done yet (intentionally deferred):**
- Linting / formatting toolchain
- Design system tokens
- Real content data files
- Secondary pages

### Iteration 2 — 2026-04-19
**Completed:** Fix build failure — migrate to correct SolidStart v2 vite-based structure

**Root cause:** Iteration 1 scaffolded `app.config.ts` (vinxi/v1 convention). SolidStart v1 via vinxi requires `src/entry-server.tsx` and `src/entry-client.tsx` as virtual handler entry points, but those files were never created. Rollup could not resolve them at build time.

**Fix:** migrated to the SolidStart v2 alpha reference structure (`npm create solid@latest . basic -- --solidstart --v2 --ts`):
- Removed `app.config.ts` (vinxi-specific, unused in v2)
- Created `vite.config.ts` using `solidStart()` plus the Nitro v2 plugin
- Created `src/entry-client.tsx` and `src/entry-server.tsx` (v2 required entry points)
- Updated `package.json`: added `"type": "module"`, switched scripts from `vinxi *` to `vite *`, pinned `@solidjs/start` to `2.0.0-alpha.2`, added `@solidjs/vite-plugin-nitro-2` and `vite`, removed `vinxi` and `vite-plugin-solid`
- Updated `tsconfig.json`: replaced `app.config.ts` with `vite.config.ts` in includes, removed `.vinxi` from excludes
- `src/routes/index.tsx` (branded homepage content) preserved unchanged

**Verification:** `npm install` and `npm run build` both pass in `rewrite/`.

### Iteration 3 — 2026-04-19
**Completed:** Phase 1, item 2 — add linting, formatting, and project conventions for `rewrite/`

- Added ESLint 9 + `typescript-eslint` + `eslint-plugin-solid`
- Added Prettier 3 plus `.prettierrc` and `.editorconfig`
- Added rewrite scripts: `typecheck`, `lint`, `format`, `format:check`, and `verify`
- Updated `tsconfig.json` with `skipLibCheck` to keep type-checking practical against the current alpha stack
- Updated `src/routes/index.tsx` to use Solid's `<For>` helper instead of array `.map()` for JSX rendering
- Updated `README.md` with the rewrite quality-check commands

**Verification:** `npm run verify` and `npm run build`

### Iteration 4 — 2026-04-19
**Completed:** Phase 1, item 3 — set up app shell, routing, layout, and metadata strategy for `rewrite/`

- Added a shared `Layout` component in `src/components/` with sticky top nav, global footer, active-link state, and shared chrome for all routes
- Added `src/config/site.ts`, `src/components/PageMeta.tsx`, and global styles/tokens to centralize site metadata, navigation config, and base visual primitives
- Refactored `src/app.tsx` and `src/routes/index.tsx` to use the shared layout and reusable metadata helper instead of route-local shell code
- Added minimal routed pages for `work`, `talks`, `open-source`, `writing`, `about`, and `contact` so the intended IA now exists in the SolidStart app
- During verification, debugged a typecheck failure caused by using React-style camelCase inline-style keys with Solid's `JSX.CSSProperties`; fixed the root cause by converting the new style objects to Solid-compatible kebab-case keys

**Verification:** `npm run verify` and `npm run build`

### Iteration 5 — 2026-04-19
**Completed:** Phase 1, item 4 — set up a reusable design system foundation for `rewrite/`

- Expanded `src/styles/global.css` with CSS custom properties for the color palette, spacing scale, typography scale, radii, and layout widths
- Refactored `src/styles/tokens.ts` to expose semantic design tokens that reference the shared CSS variables instead of raw color literals
- Added `src/styles/recipes.ts` with reusable page-shell style recipes so top-level routes stop duplicating the same spacing / type / scaffold patterns
- Updated `Layout` plus the `work`, `talks`, `open-source`, `writing`, `about`, and `contact` routes to consume the shared tokens/recipes
- Refined the homepage token usage so the hero, proof bar, and “Currently” section all read from the same design-system foundation
- During verification, `npm run verify` initially failed because Prettier found unformatted edits in `src/routes/about.tsx` and `src/routes/writing.tsx`; fixed the root cause by running the formatter and re-running the full verification pipeline

**Verification:** `npm run verify`, `npm run build`, then `npm run format && npm run verify && npm run build`

### Iteration 6 — 2026-04-19
**Completed:** Phase 1, item 5 — add analytics and structured metadata scaffolding for `rewrite/`

- Added `src/config/analytics.ts` and `src/components/AnalyticsTracker.tsx` with a no-op-by-default Plausible-compatible analytics scaffold that only activates when `VITE_ANALYTICS_DOMAIN` is configured
- Added `src/components/JsonLd.tsx` plus root-level `WebSite` and `Person` JSON-LD so the rewrite now emits structured metadata on every page
- Upgraded `src/components/PageMeta.tsx` to centralize canonical URLs, absolute OG image URLs, `twitter:*` tags, optional `noindex`, and per-page `WebPage` JSON-LD
- Expanded `src/config/site.ts` with reusable social/profile metadata and wired homepage/contact CTAs to emit analytics events without introducing any runtime dependency when analytics is disabled
- During implementation, Claude Code hit its turn limit mid-task, so the iteration was finished manually and verified directly in Hermes

**Verification:** `npm run format && npm run verify && npm run build`

---

### Iteration 7 — 2026-04-19
**Completed:** Phase 2 (convert `appearances.md` into structured talks data) + Phase 4 (Talks / Appearances page)

- Created `rewrite/src/data/talks.ts` with a typed `Appearance` interface (`title`, `event`, `location`, `date`, `url?`, `kind`, `isWorkshop?`) and all 31 appearances from `appearances.md` encoded newest-first; exports named slices `conferences`, `podcasts`, `meetups`
- Replaced the placeholder scaffold in `src/routes/talks.tsx` with a data-driven page: stats bar (total / conferences / podcasts / meetups counts), three grouped sections (Conferences & Workshops, Podcasts & Shows, Meetups & Community), per-item links, Workshop badge, and a speaking CTA footer wired to `talk_click` and `cta_speaking` analytics events
- All styles composed from existing design tokens and `pageStyles` recipe — no new dependencies introduced

**Verification:** `npm run verify && npm run build`

---

### Iteration 8 — 2026-04-19
**Completed:** Phase 0 (finalize brand/homepage messaging) + Phase 3 (hero, proof bar, talks highlights, OSS highlights, CTA footer)

- Added `rewrite/src/data/home.ts` as typed homepage content/config for positioning copy, proof stats, OSS credibility items, current-focus bullets, and CTA definitions so messaging stops living inline in the route
- Rebuilt `rewrite/src/routes/index.tsx` into a fuller homepage slice: stronger branded hero, outcome-focused CTAs, proof bar, featured talks pulled from the structured talks data, OSS highlights, refreshed “Currently” section, and a dual-path CTA footer for speaking vs collaboration
- During verification, found a TypeScript root-cause issue where the new CTA analytics event names were typed as generic strings and not part of the shared `AnalyticsEvent` union; fixed it by threading the typed event union through `src/data/home.ts` and extending the analytics event list with the new homepage CTA events

**Verification:** `npm run verify && npm run build`

---

### Iteration 9 — 2026-04-19
**Completed:** Phase 2, item 2 — convert `resume.md` into structured website content

- Added `rewrite/src/data/profile.ts` as typed structured content for work experience, open source contributions, community roles, and education derived from `resume.md`
- Replaced the placeholder `rewrite/src/routes/about.tsx` scaffold with a data-driven About page that now surfaces current positioning plus structured sections for work history, OSS work, community leadership, education, and a contact CTA
- During Hermes verification, found Solid reactivity lint warnings caused by aliasing `props.item` / `props.edu` outside JSX in the new About page subcomponents; fixed the root cause by reading props directly inside JSX so `eslint-plugin-solid` passes cleanly

**Verification:** `npm run format:check`, `npm run verify`, and `npm run build`

---

### Iteration 10 — 2026-04-19
**Completed:** Phase 3 (featured work section) + Phase 4 (Work / Projects page)

- Added `rewrite/src/data/projects.ts` as typed featured-project content derived from `resume.md` and legacy showcase notes so project curation now lives in one reusable source
- Expanded `rewrite/src/routes/index.tsx` with a homepage Featured Work section wired to the curated project data and `featured_work_click` analytics events
- Replaced the placeholder `rewrite/src/routes/work.tsx` scaffold with a data-driven Work page covering project summaries, architecture framing, outcomes, tech tags, and external links
- During Hermes verification, `npm run verify` initially failed because `prettier --check` flagged `src/routes/work.tsx`; fixed the root cause by formatting the file and re-running the full verification pipeline

**Verification:** `npm run verify`, `npm run build`, then `npm run format -- --write src/routes/work.tsx && npm run verify && npm run build`

---

### Iteration 11 — 2026-04-19
**Completed:** Portfolio design research synthesis captured in backlog

- Added a research-backed recommendation section that distills common patterns from modern developer portfolios, recruiter-oriented advice, and design-system references
- Recorded the preferred direction for this rewrite as a Vercel/Linear-led product-engineer aesthetic with a small Stripe/editorial influence and restrained motion
- Documented homepage execution rules, visual-system guidance, and anti-patterns so future iterations stay aligned with a proof-first portfolio instead of drifting toward template or Awwwards-cosplay territory

**Verification:** manual review of updated `backlog.md`

---

### Iteration 12 — 2026-04-19
**Completed:** Phase 4 — Open Source page

- Replaced the placeholder scaffold in `rewrite/src/routes/open-source.tsx` with a full data-driven page
- Imports `OSS_CONTRIBUTIONS` from `~/data/profile` (no new data files needed)
- Page structure: eyebrow → heading → positioning body text → stats bar (5 projects / 2 core+maintainer / 2 authored) → three grouped sections (Core & Maintainer Roles, Authored Libraries, Community Contributions) → GitHub CTA footer
- `ContributionCard` sub-component shows name, role badge, since date, description, and "View on GitHub ↗" link with `oss_click` analytics event
- `ContributionSection` sub-component mirrors the `AppearanceSection` pattern from `talks.tsx`
- All styles composed from existing tokens (`colors`, `radius`, `space`, `text`) and `pageStyles` recipes — no new dependencies
- Analytics wired using existing `oss_click` and `social_click` events — `analytics.ts` not touched
- Also marked "Decide visual direction / references" complete in Phase 0 — the research synthesis section added in Iteration 11 already satisfies that decision

---

### Iteration 13 — 2026-04-19
**Completed:** Phase 2 (curate writing highlights) + Phase 3 (homepage writing highlights section) + Phase 4 (Writing page)

- Added `rewrite/src/data/writing.ts` as a typed curated writing source that separates high-signal technical articles from archived year-in-review reflections and intentionally omits non-brand-relevant honors artifacts
- Replaced the placeholder `rewrite/src/routes/writing.tsx` scaffold with a data-driven Writing page featuring technical article cards, a reflections archive, and `writing_click` analytics wiring
- Extended `rewrite/src/routes/index.tsx` with a homepage Writing highlights section so the homepage now matches the intended hero → proof → featured work → talks → OSS → writing → CTA order from the backlog
- During verification, `npm run verify` initially failed because Claude left the homepage section incomplete and the new Writing route had Solid reactivity lint warnings from conditional early returns; fixed the root cause by wiring the homepage section fully and converting the conditional link rendering to `Show`-based JSX

**Verification:** `npm run verify` and `npm run build` (after `npm run format -- --write src/data/writing.ts src/routes/index.tsx src/routes/writing.tsx`)

---

### Iteration 14 — 2026-04-19
**Completed:** Phase 0 — decide deployment target for the SolidStart rewrite

- Chose **Netlify** as the deployment target for the in-progress `rewrite/` app and codified that decision in the repo root `netlify.toml`
- Updated `rewrite/vite.config.ts` to use Nitro's `netlify` preset so SolidStart emits Netlify-compatible SSR output
- Added `NETLIFY_SKIP_GATSBY_BUILD_PLUGIN=true` because the legacy Gatsby app still exists at the repo root and Netlify otherwise auto-injects `@netlify/plugin-gatsby`, which breaks the SolidStart build during local verification
- Updated `.gitignore` to ignore `rewrite/.solid-start/` and documented the mixed Gatsby + rewrite deployment setup in `README.md`

**Root cause found during verification:** Netlify framework detection still saw the legacy Gatsby repo metadata and auto-loaded the Gatsby build plugin, even though `base = "rewrite"` pointed the actual build at the SolidStart app. That plugin then failed looking for Gatsby-specific `.cache` artifacts.

**Verification:** `npm run build` and `netlify build --offline`

---

### Iteration 15 — 2026-04-19
**Completed:** Phase 6, items 1 and 3 — remove legacy Gatsby code/assets and confirm README is finalized

- All Gatsby-specific source files (`gatsby-browser.js`, `gatsby-config.js`, `gatsby-node.ts`, `gatsby-ssr.js`, `font-preload-cache.json`) and the legacy `src/` Gatsby content (pages, templates, old data, static images) have been removed from the working tree; the SolidStart v2 app now lives at the repo root
- Removed the `rewrite/` subdirectory, which housed the in-progress SolidStart app during the migration window, now that the app is promoted to root
- Removed `NETLIFY_SKIP_GATSBY_BUILD_PLUGIN = "true"` from `netlify.toml` — the workaround was only required while `gatsby-config.js` existed alongside the SolidStart build; Netlify framework detection no longer finds any Gatsby artifacts
- Removed `static/seo-images/**/*.png` from `.gitignore` — the `static/` directory no longer exists in the working tree
- Removed stale `gatsbyjs`/editor-template residue from `.vscode/settings.json` and updated `LICENSE` away from the inherited Gatsby starter copyright
- README was already fully updated with local-dev, quality-check, build, and Netlify deployment notes in prior iterations; confirmed complete and checked off

**Root cause found during verification:** `npm run verify` initially failed because `src/app.tsx` imported `~/components/Layout` while the migrated file still existed as `src/components/layout.tsx`. On this case-insensitive filesystem that produced a TypeScript casing conflict. Renaming the component file to `Layout.tsx` fixed the root cause instead of weakening compiler settings.

**Verification (run by Hermes):**
```bash
# No Gatsby references should remain in repo-owned files
git grep -i gatsby -- ':!backlog.md' ':!README.md' ':!LICENSE' ':!.vscode/settings.json'

# Full quality gate
npm run verify

# Production build still works
npm run build
```

---

### Iteration 17 — 2026-04-19
**Completed:** Phase 4 (404 / not-found page)

- Created `src/routes/[...404].tsx` as the SolidStart v2 catch-all route; uses `<HttpStatusCode code={404} />` for correct server-side status, `<PageMeta noIndex />` to suppress indexing, and the standard `pageStyles` recipe + design tokens to stay on-brand
- Added navigation grid (all `NAV_LINKS`) and a primary "Go home →" CTA so visitors have clear recovery paths
- Added `not_found_nav` to the `AnalyticsEvent` union in `src/config/analytics.ts` so recovery clicks can be tracked

**Verification:** `npm run typecheck` and `npm run lint` both pass cleanly

---

### Iteration 18 — 2026-04-20
**Completed:** Phase 2 — curate featured projects and ship case-study pages for the Work section

- Extended `src/data/projects.ts` so each featured project now carries a `caseStudyPath`, challenge framing, and highlight bullets; all four curated projects (`momentum-devcon`, `solid-socket`, `osdp`, `hackathon-suite`) now have structured case-study content
- Split the Work area into nested routes: `src/routes/work/index.tsx` keeps the project listing, `src/routes/work/[slug].tsx` renders the case-study page, and `src/routes/work.tsx` now serves as the nested layout wrapper
- Updated homepage featured-work cards and the Work index cards to expose `Case study →` internal links while preserving the existing external `View project` / `Source` links
- Added `case_study_click` analytics event wiring for homepage and Work-page internal navigation

**Root cause found during verification:** the first pass failed because the new nested Work route used React/Remix-style `Outlet` expectations that `@solidjs/router` does not export in this setup, and the homepage `WorkCard` call sites were not updated for the new required `onCaseStudy` prop. The fix was to use a lightweight parent route that renders `props.children` and to thread the new case-study analytics handler through the homepage card usage.

**Verification:** `npm run format -- --write src/routes/work.tsx src/routes/work/[slug].tsx src/entry-server.tsx`, `npm run verify`, and `npm run build`

---

### Iteration 16 — 2026-04-19
**Completed:** Phase 2 (central profile/contact config) + Phase 4 (Contact page) and backlog cleanup for secondary-page status

- Added `src/data/contact.ts` as the canonical typed source for contact email, speaking/collaboration CTA hrefs, and social profile metadata so contact details stop being scattered across route files
- Replaced the minimal `src/routes/contact.tsx` placeholder with a polished, data-driven Contact page that presents two clear intent paths (speaking and collaboration) plus a structured social profile list, all styled with existing tokens/recipes and wired to typed analytics events
- Rewired existing contact CTAs in `src/data/home.ts`, `src/routes/about.tsx`, and `src/routes/talks.tsx` to reuse the shared contact config instead of hard-coded `mailto:` links
- Marked the backlog items for central profile/contact config, About page, and Contact page complete now that the underlying implementation exists

**Verification:** `npm run verify` and `npm run build`

---

### Iteration 19 — 2026-04-20
**Completed:** Phase 5 — improve large-screen layout density so wide desktop screens use horizontal space intentionally

- Added a desktop-only `@media (min-width: 1280px)` override in `src/styles/global.css` so the shared `--layout-content-width` token expands from 780px to 1080px on wide screens instead of leaving oversized gutters across the homepage and secondary pages
- Updated `src/components/Layout.tsx` so the sticky header and footer now use centered inner wrappers tied to the same shared layout width token, keeping the wider page rhythm aligned instead of stretching chrome edge-to-edge while content widens
- This ships as a design-system-level density improvement, so homepage sections plus the Work/Talks/Writing/About/Contact pages all inherit the wider desktop layout without per-page rewrites

**Root cause found during verification:** the site's shared layout width token was fixed at 780px for every viewport, which made wide desktop screens feel underused. During verification, `npm run format:check` also failed because `src/entry-server.tsx` had stale formatting drift from a previous iteration; the root cause there was that earlier targeted formatting had not normalized the whole file. The density fix was to widen the token only at large breakpoints and align layout chrome to it; the verification fix was to format `src/entry-server.tsx` and re-run the full pipeline.

**Verification:** `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run format -- --write src/entry-server.tsx src/components/Layout.tsx src/styles/global.css`, `npm run verify`, and `npm run build`

---

### Iteration 20 — 2026-04-20
**Completed:** Phase 5 — fix mobile header spacing so the first nav link does not crowd the site name

- Updated `src/components/Layout.tsx` to move the header chrome to semantic CSS classes (`site-header`, `site-header-inner`, `site-brand`, `site-nav-links`, `site-nav-link`) while keeping the footer and route shell unchanged
- Added responsive header rules in `src/styles/global.css` so the mobile header reflows into a two-row layout: the brand gets its own line, nav links wrap beneath it, and long labels like `Open Source` stay intact with `white-space: nowrap`
- Preserved the existing desktop header rhythm while making the small-screen header readable without the first nav link crowding the site name

**Root cause found during verification:** the original header used a single desktop-oriented flex row with fixed gaps at all breakpoints, so on mobile the first nav link sat too close to the site brand and long labels wrapped awkwardly. Claude Code's first pass also left `Layout.tsx` in a partial broken state by referencing deleted inline-style keys (`styles.nav`, `styles.navInner`, `styles.navLinks`, `linkStyle`); the fix was to complete the refactor to class-based header styling and verify the resulting mobile layout from a 390px-wide screenshot.

**Verification:** `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run verify`, `npm run build`, plus mobile screenshot review via `npx playwright screenshot -b chromium --viewport-size='390,844' --full-page http://127.0.0.1:4173/ /tmp/portfolio-mobile-home-after2.png`

---

### Iteration 21 — 2026-04-20
**Completed:** Phase 5 — fix small-screen proof-bar/stat wrapping, especially the `DevRel` / `PowerSync` item

- Added a dedicated `proof-item` class to the homepage proof-bar cards in `src/routes/index.tsx` so the shared proof-bar item can receive mobile-specific layout treatment without disturbing the desktop/tablet inline style structure
- Added a narrow-screen override in `src/styles/global.css` (`@media (max-width: 639px)`) that stacks proof-bar items to full width, removes the right-hand divider, reduces horizontal padding, and uses bottom dividers between items instead of the cramped two-column treatment
- This turns the homepage proof bar into a clean vertical list on phones, resolving the tight `DevRel` / `PowerSync` cell and improving readability for all four proof stats while preserving the wider-screen appearance

**Root cause found during verification:** the proof bar used a rigid wrapped flex layout with `flex: 1 1 160px` plus generous horizontal padding and right-side borders on every card, which effectively forced a cramped two-column grid on ~390px screens. The `DevRel` / `PowerSync` item exposed the issue most clearly because its narrow cell had too little usable width after padding and dividers. The fix was to give proof items a mobile-only full-width stacked layout instead of trying to preserve the desktop multi-column rhythm on phones.

**Verification:** `npm run verify`, `npm run build`, plus before/after 390px-wide screenshot review via `npx playwright screenshot -b chromium --viewport-size='390,844' --full-page http://127.0.0.1:4173/ /tmp/portfolio-proofbar-before.png` and `npx playwright screenshot -b chromium --viewport-size='390,844' --full-page http://127.0.0.1:4173/ /tmp/portfolio-proofbar-after.png`

---

### Iteration 22 — 2026-04-20
**Completed:** Phase 5 — responsive review pass

- Ran a focused 390px mobile review across the homepage plus the `work`, `talks`, `open-source`, `writing`, `about`, and `contact` routes, along with the `Momentum DevCon App` case-study page, to find the highest-impact remaining small-screen issues
- Fixed the case-study route in `src/routes/work/[slug].tsx` by giving the detail rows a responsive class hook and stacking the label/content layout on small screens instead of keeping the desktop two-column rhythm on phones
- Moved the shared footer inner layout into `src/styles/global.css` and added a narrow-screen rule so copyright and the SolidStart credit stack cleanly across the site on mobile
- Confirmed the homepage and the updated case-study page render without browser-console errors after the responsive fixes

**Root cause found during verification:** the case-study page kept a desktop-oriented flex row with a `min-width: 110px` left label column at every breakpoint, which squeezed the body copy into an overly narrow mobile column. The shared footer had a similar issue: it used a fixed horizontal `justify-content: space-between` layout at every width, which made the small-screen footer feel cramped. The fix was to keep the existing desktop layout intact while adding mobile-only stacking rules for those two shared problem areas.

**Verification:** `npm run verify`, `npm run build`, `npx playwright screenshot -b chromium --viewport-size='390,844' --full-page http://127.0.0.1:4173/ /tmp/portfolio-home-after.png`, `npx playwright screenshot -b chromium --viewport-size='390,844' --full-page http://127.0.0.1:4173/work /tmp/portfolio-work-after.png`, and `npx playwright screenshot -b chromium --viewport-size='390,844' --full-page http://127.0.0.1:4173/work/momentum-devcon /tmp/portfolio-case-study-after.png`

---

### Iteration 23 — 2026-04-20
**Completed:** Phase 5 — accessibility review pass

- Added a shared skip link in `src/components/Layout.tsx` plus supporting styles in `src/styles/global.css`, and made the shared `<main>` landmark focusable so keyboard users can bypass the sticky nav and land directly in page content
- Upgraded homepage section labels in `src/routes/index.tsx` and Writing page subsection labels in `src/routes/writing.tsx` from styled spans to real `h2` elements, preserving the current visual design while fixing the missing heading hierarchy in the accessibility tree
- Gave the homepage Writing highlight CTA a descriptive accessible label (`Read <article title>`) instead of exposing an unlabeled arrow-only control to assistive tech
- Smoke-checked `/` and `/writing` in the local browser after the changes and confirmed the pages render without console errors

**Root cause found during verification:** the shared layout optimized for visual polish but omitted a skip link and focusable main target, while the homepage and Writing page used presentation-only spans for subsection labels. That left keyboard users without a fast path past navigation and left assistive technologies with an incomplete heading outline. The homepage Writing cards had a related issue: the CTA rendered as a bare arrow, so the control had almost no standalone meaning in the accessibility tree. The fix was to add shared keyboard-navigation affordances and swap the presentation-only labels for semantic headings without redesigning the page.

**Verification:** `npm run verify`, `npm run build`, and local browser checks on `http://127.0.0.1:4173/` and `http://127.0.0.1:4173/writing` with console review

---

### Iteration 24 — 2026-04-20
**Completed:** Phase 5 — SEO review pass + custom OG/social-card coverage

- Updated `src/config/site.ts` so the site-wide fallback OG image now points at the existing `public/og.svg` asset instead of the missing `/og.png`
- Wired route-specific `ogImage` coverage into the homepage plus the top-level `Work`, `Talks`, `Open Source`, `Writing`, `About`, and `Contact` pages, and reused the Work social card for project case-study routes
- Added `public/robots.txt` and `public/sitemap.xml`, and removed the stale `public` ignore rule from `.gitignore`, so crawlers now receive an explicit crawl policy and a sitemap that includes all top-level pages plus the existing Work case-study URLs
- Reconciled stale backlog state by checking off both `Add custom OG images / social cards` and `Add SEO review pass` now that the assets are actually wired into page metadata and technical SEO coverage exists

**Root cause found during verification:** the rewrite already had polished OG SVG assets in `public/`, but the shared site config still advertised `/og.png`, which does not exist, and no route overrode that default. That left social metadata pointing at a broken image URL while `robots.txt` and `sitemap.xml` were both absent. Hermes also found that `public/` was still gitignored, so the new crawler files would not have shipped until `.gitignore` was corrected. During Hermes verification, `npm run verify` failed once because the new case-study `PageMeta` line in `src/routes/work/[slug].tsx` needed Prettier formatting; the fix was to format that file and re-run the full pipeline.

**Verification:** `npm run verify && npm run build` (initial run, caught the Prettier failure), `npm run format -- --write src/routes/work/[slug].tsx && npm run verify && npm run build`, `curl -s http://127.0.0.1:4173/robots.txt`, `curl -s http://127.0.0.1:4173/sitemap.xml`, plus local browser metadata/console checks on `http://127.0.0.1:4173/`, `http://127.0.0.1:4173/work`, and `http://127.0.0.1:4173/work/momentum-devcon`

## Immediate next steps

1. Finish the final content sweep for stale claims and broken links.
2. Run a performance review pass.
3. Preserve or redirect legacy routes where useful.
4. Launch the new site.

---

## Non-goals

- preserving the old visual design
- preserving Gatsby implementation details
- keeping weak or outdated content just for completeness
- trying to make every historical project equally prominent
- overbuilding CMS complexity before the content model is proven

---

## Success criteria

The rewrite is successful if:
- a first-time visitor understands the current version of Dev immediately
- the site feels modern and ecosystem-aligned
- the strongest proof points are visible without digging
- content maintenance becomes easy enough to keep the site current
- the site itself feels like a high-signal example of technical taste
