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

---

## Rewrite backlog

## Phase 0 — foundation / decisions
- [ ] Decide final brand position and homepage messaging
- [ ] Decide final information architecture
- [ ] Decide visual direction / references
- [ ] Decide content source strategy (markdown, mdx, typed data, or mixed)
- [ ] Decide deployment target for SolidStart app
- [ ] Decide whether to preserve any legacy URLs for SEO

## Phase 1 — bootstrap the new app
- [x] Create a fresh SolidStart v2 app using the current recommended setup
- [x] Add TypeScript, linting, formatting, and project conventions
- [ ] Set up app shell, routing, layout, and metadata strategy
- [ ] Set up a design system foundation (tokens, spacing, typography, color)
- [ ] Add analytics and structured metadata scaffolding

## Phase 2 — content modeling
- [ ] Inventory what existing content should be kept, rewritten, or deleted
- [ ] Convert `resume.md` into structured website content
- [ ] Convert `appearances.md` into structured talks data
- [ ] Curate featured projects and case studies
- [ ] Curate writing highlights
- [ ] Create a central profile/contact config

## Phase 3 — homepage
- [ ] Build hero section
- [ ] Build proof bar
- [ ] Build featured work section
- [ ] Build talks highlights section
- [ ] Build OSS highlights section
- [ ] Build writing highlights section
- [ ] Build CTA footer

## Phase 4 — secondary pages
- [ ] Work / Projects page
- [ ] Talks / Appearances page
- [ ] Open Source page
- [ ] Writing page
- [ ] About page
- [ ] Contact page
- [ ] 404 page

## Phase 5 — polish / credibility
- [ ] Add custom OG images / social cards
- [ ] Add subtle motion and interaction polish
- [ ] Add accessibility review pass
- [ ] Add performance review pass
- [ ] Add responsive review pass
- [ ] Add SEO review pass

## Phase 6 — cleanup / launch
- [ ] Remove old Gatsby-specific code and assets once replacement is ready
- [ ] Preserve or redirect legacy routes where useful
- [ ] Update README with local setup and deployment notes
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

---

## Immediate next steps

1. Treat this as a **rewrite**, not a refactor.
2. Start from a fresh SolidStart v2 app.
3. Rebuild the content model around:
   - current roles
   - talks
   - OSS
   - featured work
   - writing
4. Design the homepage around proof and positioning first.
5. Port only the content that still strengthens the brand.

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
