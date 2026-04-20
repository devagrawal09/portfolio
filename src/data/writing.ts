// Curated writing — technical articles surfaced prominently; year-in-review
// reflections preserved in an archive section. Honors program artifacts
// (pitch.md, gcsp.md) are intentionally omitted as not brand-relevant.
//
// Source material: ../../../src/data/blog/articles/
// Add `url` when an article is published externally or migrated to the new site.

import type { AnalyticsEvent } from "~/config/analytics";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ArticleKind = "technical" | "reflection";

export interface Article {
  /** URL-safe identifier matching the legacy slug */
  slug: string;
  title: string;
  /** ISO date "YYYY-MM-DD" — used for sorting */
  date: string;
  /** Human-readable date shown in the UI, e.g. "Jun 2022" */
  displayDate: string;
  /** One-sentence curated summary for card/list contexts */
  description: string;
  /** Short identifiers for the tag strip */
  tags: string[];
  /** External URL — omit if article is not yet live on a canonical URL */
  url?: string;
  kind: ArticleKind;
  /** Surface on the homepage writing highlights strip */
  featured: boolean;
  analyticsEvent: Extract<AnalyticsEvent, "writing_click">;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const ARTICLES: Article[] = [
  // ── Featured technical articles ─────────────────────────────────────────────
  {
    slug: "isomorphic",
    title: "Isomorphic Code",
    date: "2022-05-31",
    displayDate: "May 2022",
    description:
      "How full-stack JavaScript enables the same code to run on client and server — from virtual DOM to SSR frameworks like Next.js, Nuxt, and SolidStart.",
    tags: ["SSR", "JavaScript", "Fullstack"],
    kind: "technical",
    featured: true,
    analyticsEvent: "writing_click",
  },
  {
    slug: "serverless",
    title: "Serverless Deployment",
    date: "2022-06-16",
    displayDate: "Jun 2022",
    description:
      "A practical breakdown of Functions-as-a-Service: on-demand execution, cold vs. hot starts, elasticity trade-offs, and when serverless is (and isn't) the right call.",
    tags: ["Serverless", "Cloud", "AWS"],
    kind: "technical",
    featured: true,
    analyticsEvent: "writing_click",
  },

  // ── Year-in-review archive ───────────────────────────────────────────────────
  {
    slug: "senior",
    title: "Year in Review: Senior",
    date: "2023-07-23",
    displayDate: "Jul 2023",
    description:
      "Graduating, landing a DevRel role, and speaking at conferences — alongside the unexpected cracks that can form when you level up fast.",
    tags: ["DevRel", "Career", "Reflection"],
    kind: "reflection",
    featured: false,
    analyticsEvent: "writing_click",
  },
  {
    slug: "junior",
    title: "Year in Review: Junior",
    date: "2022-06-11",
    displayDate: "Jun 2022",
    description:
      "A year of stepping up as a tech lead, confronting self-doubt, and learning what real responsibility actually feels like.",
    tags: ["Career", "Reflection"],
    kind: "reflection",
    featured: false,
    analyticsEvent: "writing_click",
  },
  {
    slug: "pre-junior",
    title: "Year in Review: Pre-Junior",
    date: "2021-05-05",
    displayDate: "May 2021",
    description:
      "A transitional year leading hackathon infrastructure and deepening fullstack skills while building toward production civic tech.",
    tags: ["Career", "Reflection"],
    kind: "reflection",
    featured: false,
    analyticsEvent: "writing_click",
  },
  {
    slug: "sophomore",
    title: "Year in Review: Sophomore",
    date: "2020-06-02",
    displayDate: "Jun 2020",
    description:
      "Shipping the first version of the Ohio Sentencing Data Platform during a pandemic — taking ownership, learning to build for real users.",
    tags: ["Career", "Reflection"],
    kind: "reflection",
    featured: false,
    analyticsEvent: "writing_click",
  },
  {
    slug: "freshman",
    title: "Year in Review: Freshman",
    date: "2019-05-23",
    displayDate: "May 2019",
    description:
      "First year at UC: discovering the developer community, joining hackathons, and figuring out what kind of engineer to become.",
    tags: ["Career", "Reflection"],
    kind: "reflection",
    featured: false,
    analyticsEvent: "writing_click",
  },
];

/** Articles surfaced on the homepage writing highlights strip */
export const featuredArticles = ARTICLES.filter((a) => a.featured);

/** Technical deep-dives — sorted newest-first */
export const technicalArticles = ARTICLES.filter((a) => a.kind === "technical").sort((a, b) =>
  b.date.localeCompare(a.date)
);

/** Personal year-in-review reflections — sorted newest-first */
export const reflectionArticles = ARTICLES.filter((a) => a.kind === "reflection").sort((a, b) =>
  b.date.localeCompare(a.date)
);
