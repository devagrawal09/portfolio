// Curated writing — technical articles surfaced prominently; year-in-review
// reflections preserved in an archive section. Honors program artifacts
// (pitch.md, gcsp.md) are intentionally omitted as not brand-relevant.
//
// Source material: git history commit 310b4a3d (src/data/blog/articles/)
// Technical articles are hosted at /writing/:slug (internal routes).

import type { AnalyticsEvent } from "~/config/analytics";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ArticleKind = "technical" | "reflection";

export interface ArticleSection {
  heading?: string;
  /** One or more paragraphs separated by \n\n */
  body: string;
}

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
  /**
   * Destination URL. Use a root-relative path (e.g. "/writing/isomorphic")
   * for internal articles; a full https:// URL for external ones.
   */
  url?: string;
  kind: ArticleKind;
  /** Surface on the homepage writing highlights strip */
  featured: boolean;
  analyticsEvent: Extract<AnalyticsEvent, "writing_click">;
  /** Prose sections rendered on the internal article detail page */
  sections?: ArticleSection[];
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
    url: "/writing/isomorphic",
    analyticsEvent: "writing_click",
    sections: [
      {
        body: "Isomorphic code is code that can run on both client and server. The rise of full-stack JavaScript made this possible — any JavaScript that only uses the standard library is isomorphic by default, which is why popular utility libraries like Lodash, Moment, and RxJS work in any environment.\n\nTo build a usable application, though, we have to use platform-specific features: the DOM API to manipulate elements in the browser, or the Node HTTP API to create a server. Working with data is also different on each side — fetching from an HTTP API and storing in memory on the client, versus querying a database and sending a response on the server.",
      },
      {
        heading: "Isomorphic abstractions",
        body: "To write isomorphic code for application concerns, we need abstractions. Meteor was one of the first frameworks to take this seriously. It provided shared data fetching, validation schemas, and mutation methods that could run on both client and server — so you only had to write platform-specific code for view templates or server configuration.",
      },
      {
        heading: "Is React isomorphic?",
        body: "React is isomorphic, and the secret is the Virtual DOM. When you write a React component, React doesn't create real DOM nodes — it creates lightweight JavaScript objects that a companion library (react-dom) later converts into actual HTML elements. Because React never directly touches the browser DOM, it can run in Node.js too.\n\nThis means React can be used on the server to generate PDF files, power HTTP endpoints, or — most commonly — produce fully-rendered HTML before it reaches the browser.",
      },
      {
        heading: "Rendering on the server",
        body: "After the industry shifted from server-rendered PHP to client-rendered React and Angular apps, we discovered real costs: downloading hundreds of kilobytes of JavaScript before anything appeared on screen hurt both performance and SEO. So we went back to rendering on the server — but now using the same JavaScript and component model we had grown to love.\n\nFrameworks like Next.js and Gatsby (and later Nuxt for Vue, and SolidStart for Solid) were born from this insight. They abstract the boundary between client and server so you can write components that consume database-sourced data without manual HTTP fetching — the framework handles the data handoff.",
      },
      {
        heading: "Beyond React and beyond JavaScript",
        body: "React pioneered the virtual DOM, but it is far from alone. Vue uses the same concept and can be server-rendered with Nuxt. Angular takes a different approach — ahead-of-time compilation — which also enables server rendering via Angular Universal.\n\nWith WebAssembly, languages beyond JavaScript can now run in the browser too. Microsoft's Blazor and Apache's UNO run C# in the browser; PyScript brings Python. These are still niche, but they point to a world where \"isomorphic\" extends beyond just JavaScript.\n\nFor now, JavaScript remains the dominant runtime on both client and server. As long as that's true, isomorphic code will remain a core design pattern in the frameworks and tooling we reach for every day.",
      },
    ],
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
    url: "/writing/serverless",
    analyticsEvent: "writing_click",
    sections: [
      {
        body: 'Serverless Functions — also called Functions as a Service — let you write application code focused entirely on business logic, without thinking about infrastructure or runtime management. The "serverless" label is a bit misleading: there are still servers, you just never provision, configure, or pay for idle ones.',
      },
      {
        heading: "How it works",
        body: "In a traditional web API, you register route handlers in a framework like Express, start a server process, and keep it running. With a platform like AWS Lambda, you instead export named handler functions and declare what events should trigger them in a configuration file. Lambda registers the function, manages the runtime, and invokes it on demand.\n\nThe key difference: you deploy logic, not a server. There is no long-running process to babysit. Lambda handles routing, scaling, and cleanup.",
      },
      {
        heading: "Execution on demand",
        body: "A traditional app spins up once and stays alive — consuming memory and compute even during quiet periods, just waiting for requests.\n\nA serverless function only runs when triggered. Lambda either reuses a warm container that already has the function loaded in memory (hot start) or spins up a fresh one (cold start). After execution, the container may stay warm for a while or shut down entirely.\n\nThis model is extremely elastic. One request per second means one function execution per second. A thousand concurrent requests means a thousand containers — all without any manual scaling configuration.",
      },
      {
        heading: "Cost trade-offs",
        body: "Serverless is not universally cheaper. The per-unit cost is higher: AWS Lambda runs roughly $0.06 per hour of execution time (billed per millisecond with 1 GB memory), while an EC2 instance with equivalent memory costs $0.008–$0.01 per hour — whether or not it is handling requests.\n\nThe calculus flips depending on utilization. With highly variable or unpredictable traffic, you pay only for actual work done. With consistent high-volume traffic, a traditional server wins because you are not paying the serverless premium on every invocation.",
      },
      {
        heading: "When serverless is the right call",
        body: "Serverless fits best when traffic is unpredictable, your functions are small and independently deployable, and you want to minimize operational overhead. It is a natural fit for event-driven workloads, background jobs, and APIs with variable load patterns.\n\nIt is a poor fit for consistently high-throughput services, long-running computations, or tightly coupled systems that do not decompose cleanly into single-responsibility functions. Like microservices — which share many of the same design principles — serverless rewards clear function boundaries and punishes spaghetti.\n\nAt its best, serverless represents the logical endpoint of cloud infrastructure's promise: write code, deploy it, pay only for what you use.",
      },
    ],
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

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getLegacyWritingPath(slug: string) {
  const article = getArticleBySlug(slug);
  if (!article) return "/writing";
  if (article.url?.startsWith("/")) return article.url;
  return `/writing#${article.slug}`;
}
