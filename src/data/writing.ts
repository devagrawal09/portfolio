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
  /** Publication or platform where the piece appears */
  source?: string;
  /** Relative Markdown content file, loaded from /content */
  contentPath?: string;
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
  // ── External technical writing ──────────────────────────────────────────────
  {
    slug: "powersync-building-ai-powered-apps-part-2",
    title: "Building AI-Powered Apps: Part 2",
    date: "2026-05-04",
    displayDate: "May 2026",
    description:
      "A practical look at agents, deterministic workflows, and hybrid agentic workflow patterns for AI-powered applications.",
    tags: ["AI", "Agents", "Architecture"],
    source: "PowerSync",
    contentPath: "writing/powersync/building-ai-powered-apps-part-2.md",
    kind: "technical",
    featured: true,
    url: "https://powersync.com/blog/building-ai-powered-apps-part-2",
    analyticsEvent: "writing_click",
  },
  {
    slug: "powersync-building-ai-powered-apps-part-1",
    title: "Building AI-Powered Apps: Part 1",
    date: "2026-04-24",
    displayDate: "Apr 2026",
    description:
      "An introduction to the core primitives behind AI applications: prompts, tools, and context.",
    tags: ["AI", "Tools", "Architecture"],
    source: "PowerSync",
    contentPath: "writing/powersync/building-ai-powered-apps-part-1.md",
    kind: "technical",
    featured: true,
    url: "https://powersync.com/blog/building-ai-powered-apps-part-1",
    analyticsEvent: "writing_click",
  },
  {
    slug: "powersync-why-is-every-ai-app-single-player",
    title: "Why Is Every AI App Single Player?",
    date: "2026-04-21",
    displayDate: "Apr 2026",
    description:
      "Why AI apps often miss collaborative, multiplayer product experiences, and what sync engines unlock.",
    tags: ["AI", "Collaboration", "Sync"],
    source: "PowerSync",
    contentPath: "writing/powersync/why-is-every-ai-app-single-player.md",
    kind: "technical",
    featured: true,
    url: "https://powersync.com/blog/why-is-every-ai-app-single-player",
    analyticsEvent: "writing_click",
  },
  {
    slug: "powersync-most-ai-chat-apps-are-broken",
    title: "Most AI Chat Apps Are Broken. Sync Engines are the Fix.",
    date: "2026-04-10",
    displayDate: "Apr 2026",
    description:
      "A sync-engine framing for building AI chat apps that feel resilient, responsive, and production-ready.",
    tags: ["AI", "Chat", "Sync"],
    source: "PowerSync",
    contentPath: "writing/powersync/most-ai-chat-apps-are-broken-sync-engines-are-the-fix.md",
    kind: "technical",
    featured: false,
    url: "https://powersync.com/blog/most-ai-chat-apps-are-broken-sync-engines-are-the-fix",
    analyticsEvent: "writing_click",
  },
  {
    slug: "powersync-offline-first-tanstack-db",
    title: "Offline-First Apps with TanStack DB and PowerSync",
    date: "2026-02-26",
    displayDate: "Feb 2026",
    description:
      "A walkthrough of building offline-first applications with TanStack DB and PowerSync.",
    tags: ["Offline-first", "TanStack", "Sync"],
    source: "PowerSync",
    contentPath: "writing/powersync/offline-first-apps-with-tanstack-db-and-powersync.md",
    kind: "technical",
    featured: false,
    url: "https://powersync.com/blog/offline-first-apps-with-tanstack-db-and-powersync",
    analyticsEvent: "writing_click",
  },
  {
    slug: "powersync-unleashing-the-power-of-sync",
    title: "Unleashing the Power of Sync",
    date: "2026-02-06",
    displayDate: "Feb 2026",
    description:
      "A high-level framing of sync engines and the product experiences they make possible.",
    tags: ["Sync", "Local-first", "Architecture"],
    source: "PowerSync",
    contentPath: "writing/powersync/unleashing-the-power-of-sync.md",
    kind: "technical",
    featured: false,
    url: "https://www.powersync.com/blog/unleashing-the-power-of-sync",
    analyticsEvent: "writing_click",
  },
  {
    slug: "devto-async-transformations-in-reactivity",
    title: "Async Transformations in Reactivity",
    date: "2025-05-15",
    displayDate: "May 2025",
    description: "A deep dive into asynchronous transformations in reactive programming systems.",
    tags: ["Reactivity", "Async", "JavaScript"],
    source: "DEV",
    contentPath: "writing/devto/async-transformations-in-reactivity-9b0.md",
    kind: "technical",
    featured: true,
    url: "https://dev.to/devagr/async-transformations-in-reactivity-9b0",
    analyticsEvent: "writing_click",
  },
  {
    slug: "devto-scheduling-transformations-in-reactivity",
    title: "Scheduling Transformations in Reactivity",
    date: "2025-05-03",
    displayDate: "May 2025",
    description: "How scheduling affects transformation behavior in reactive programming systems.",
    tags: ["Reactivity", "Scheduling", "JavaScript"],
    source: "DEV",
    contentPath: "writing/devto/scheduling-transformations-in-reactivity-da.md",
    kind: "technical",
    featured: false,
    url: "https://dev.to/devagr/scheduling-transformations-in-reactivity-da",
    analyticsEvent: "writing_click",
  },
  {
    slug: "devto-transformations-in-reactivity",
    title: "Transformations in Reactivity",
    date: "2025-05-03",
    displayDate: "May 2025",
    description: "A technical exploration of transformations in reactive programming.",
    tags: ["Reactivity", "JavaScript"],
    source: "DEV",
    contentPath: "writing/devto/transformations-in-reactivity-1nn5.md",
    kind: "technical",
    featured: false,
    url: "https://dev.to/devagr/transformations-in-reactivity-1nn5",
    analyticsEvent: "writing_click",
  },
  {
    slug: "devto-dynamic-typing-is-obsolete",
    title: "Dynamic Typing is Obsolete",
    date: "2023-12-13",
    displayDate: "Dec 2023",
    description: "A position piece on the evolution of typing and developer tooling.",
    tags: ["TypeScript", "Types", "JavaScript"],
    source: "DEV",
    contentPath: "writing/devto/dynamic-typing-is-obsolete-5404.md",
    kind: "technical",
    featured: false,
    url: "https://dev.to/devagr/dynamic-typing-is-obsolete-5404",
    analyticsEvent: "writing_click",
  },
  {
    slug: "devto-server-components-websockets",
    title: "Thoughts on Server Components + Websockets",
    date: "2023-12-13",
    displayDate: "Dec 2023",
    description:
      "Notes on the relationship between server components, realtime updates, and websocket-driven applications.",
    tags: ["React", "WebSockets", "Realtime"],
    source: "DEV",
    contentPath: "writing/devto/thoughts-on-server-components-websockets-316n.md",
    kind: "technical",
    featured: false,
    url: "https://dev.to/devagr/thoughts-on-server-components-websockets-316n",
    analyticsEvent: "writing_click",
  },
  {
    slug: "medium-server-components-websockets",
    title: "Thoughts on Server Components and Websockets",
    date: "2023-12-13",
    displayDate: "Dec 2023",
    description:
      "A Medium-hosted version of notes on server components, realtime updates, and websocket-driven applications.",
    tags: ["React", "WebSockets", "Realtime"],
    source: "Medium",
    contentPath: "writing/medium/thoughts-on-server-components-websockets.md",
    kind: "technical",
    featured: false,
    url: "https://medium.com/stackademic/thoughts-on-server-components-websockets-ed3db4bbd8ed",
    analyticsEvent: "writing_click",
  },
  {
    slug: "clerk-webhooks-data-sync-convex",
    title: "Clerk Webhooks: Data Sync with Convex",
    date: "2023-11-14",
    displayDate: "Nov 2023",
    description: "A guide to syncing Clerk user data into Convex with webhook-driven data flows.",
    tags: ["Clerk", "Convex", "Webhooks"],
    source: "Clerk",
    contentPath: "writing/clerk/webhooks-data-sync-convex.md",
    kind: "technical",
    featured: false,
    url: "https://clerk.com/blog/webhooks-data-sync-convex",
    analyticsEvent: "writing_click",
  },
  {
    slug: "devto-clerk-webhooks-data-sync-convex",
    title: "Clerk Webhooks: Data Sync with Convex",
    date: "2023-12-13",
    displayDate: "Dec 2023",
    description: "A DEV cross-post about syncing Clerk user data into Convex with webhooks.",
    tags: ["Clerk", "Convex", "Webhooks"],
    source: "DEV",
    contentPath: "writing/devto/clerk-webhooks-data-sync-with-convex-1jeh.md",
    kind: "technical",
    featured: false,
    url: "https://dev.to/clerk/clerk-webhooks-data-sync-with-convex-1jeh",
    analyticsEvent: "writing_click",
  },
  {
    slug: "medium-clerk-webhooks-data-sync-convex",
    title: "Clerk Webhooks: Data Sync with Convex",
    date: "2023-12-13",
    displayDate: "Dec 2023",
    description: "A Medium cross-post about syncing Clerk user data into Convex with webhooks.",
    tags: ["Clerk", "Convex", "Webhooks"],
    source: "Medium",
    contentPath: "writing/medium/clerk-webhooks-data-sync-with-convex.md",
    kind: "technical",
    featured: false,
    url: "https://medium.com/@devagrawal09/clerk-webhooks-data-sync-with-convex-f11016dbbb4f",
    analyticsEvent: "writing_click",
  },
  {
    slug: "clerk-webhooks-getting-started",
    title: "Clerk Webhooks: Getting Started",
    date: "2023-09-29",
    displayDate: "Sep 2023",
    description: "A getting-started guide for using Clerk webhooks in application data workflows.",
    tags: ["Clerk", "Webhooks"],
    source: "Clerk",
    contentPath: "writing/clerk/webhooks-getting-started.md",
    kind: "technical",
    featured: false,
    url: "https://clerk.com/blog/webhooks-getting-started",
    analyticsEvent: "writing_click",
  },
  {
    slug: "devto-clerk-webhooks-getting-started",
    title: "Clerk Webhooks: Getting Started",
    date: "2023-11-29",
    displayDate: "Nov 2023",
    description: "A DEV cross-post introducing Clerk webhooks and webhook handling.",
    tags: ["Clerk", "Webhooks"],
    source: "DEV",
    contentPath: "writing/devto/clerk-webhooks-getting-started-lbi.md",
    kind: "technical",
    featured: false,
    url: "https://dev.to/clerk/clerk-webhooks-getting-started-lbi",
    analyticsEvent: "writing_click",
  },
  {
    slug: "medium-clerk-webhooks-getting-started",
    title: "Clerk Webhooks: Getting Started",
    date: "2023-11-29",
    displayDate: "Nov 2023",
    description: "A Medium cross-post introducing Clerk webhooks and webhook handling.",
    tags: ["Clerk", "Webhooks"],
    source: "Medium",
    contentPath: "writing/medium/clerk-webhooks-getting-started.md",
    kind: "technical",
    featured: false,
    url: "https://medium.com/stackademic/clerk-webhooks-getting-started-8c530da7164c",
    analyticsEvent: "writing_click",
  },
  {
    slug: "clerk-how-we-roll-roundup",
    title: "How We Roll - Chapter 10: Roundup",
    date: "2023-08-11",
    displayDate: "Aug 2023",
    description: "A roundup entry in Clerk's How We Roll authentication series.",
    tags: ["Clerk", "Auth", "Series"],
    source: "Clerk",
    contentPath: "writing/clerk/how-we-roll-roundup.md",
    kind: "technical",
    featured: false,
    url: "https://clerk.com/blog/how-we-roll-roundup",
    analyticsEvent: "writing_click",
  },
  {
    slug: "clerk-how-we-roll-infrastructure",
    title: "How We Roll - Chapter 9: Infrastructure",
    date: "2023-08-04",
    displayDate: "Aug 2023",
    description: "A look at infrastructure concerns behind authentication systems.",
    tags: ["Clerk", "Auth", "Infrastructure"],
    source: "Clerk",
    contentPath: "writing/clerk/how-we-roll-infrastructure.md",
    kind: "technical",
    featured: false,
    url: "https://clerk.com/blog/how-we-roll-infrastructure",
    analyticsEvent: "writing_click",
  },
  {
    slug: "clerk-how-we-roll-sessions",
    title: "How We Roll - Chapter 8: Sessions",
    date: "2023-07-21",
    displayDate: "Jul 2023",
    description: "An explanation of session handling in Clerk's authentication series.",
    tags: ["Clerk", "Auth", "Sessions"],
    source: "Clerk",
    contentPath: "writing/clerk/how-we-roll-sessions.md",
    kind: "technical",
    featured: false,
    url: "https://clerk.com/blog/how-we-roll-sessions",
    analyticsEvent: "writing_click",
  },
  {
    slug: "clerk-how-we-roll-jwt-sso",
    title: "How We Roll - Chapter 7: JWT Single Sign-On",
    date: "2023-07-14",
    displayDate: "Jul 2023",
    description: "A Clerk authentication-series article on JWT-based single sign-on.",
    tags: ["Clerk", "Auth", "JWT"],
    source: "Clerk",
    contentPath: "writing/clerk/how-we-roll-jwt-sso.md",
    kind: "technical",
    featured: false,
    url: "https://clerk.com/blog/how-we-roll-jwt-sso",
    analyticsEvent: "writing_click",
  },
  {
    slug: "clerk-how-we-roll-email-verification",
    title: "How We Roll - Chapter 4: Email Verification",
    date: "2023-06-09",
    displayDate: "Jun 2023",
    description: "A Clerk authentication-series article on email verification flows.",
    tags: ["Clerk", "Auth", "Email"],
    source: "Clerk",
    contentPath: "writing/clerk/how-we-roll-email-verification.md",
    kind: "technical",
    featured: false,
    url: "https://clerk.com/blog/how-we-roll-email-verification",
    analyticsEvent: "writing_click",
  },

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
  {
    slug: "medium-serverless-deployment",
    title: "Serverless Deployment",
    date: "2022-06-16",
    displayDate: "Jun 2022",
    description: "The Medium-hosted version of a practical breakdown of serverless deployment.",
    tags: ["Serverless", "Cloud", "AWS"],
    source: "Medium",
    contentPath: "writing/medium/serverless-deployment.md",
    kind: "technical",
    featured: false,
    url: "https://medium.com/@devagrawal09/serverless-deployment-b0edecc94fe4",
    analyticsEvent: "writing_click",
  },
  {
    slug: "medium-isomorphic-code",
    title: "Isomorphic Code",
    date: "2022-05-31",
    displayDate: "May 2022",
    description: "The Medium-hosted version of a primer on code that runs on client and server.",
    tags: ["SSR", "JavaScript", "Fullstack"],
    source: "Medium",
    contentPath: "writing/medium/isomorphic-code.md",
    kind: "technical",
    featured: false,
    url: "https://medium.com/@devagrawal09/isomorphic-code-42627b4ff601",
    analyticsEvent: "writing_click",
  },
  {
    slug: "medium-learning-software-development-part-2",
    title: "The correct approach to learning software development - Part 2",
    date: "2020-01-26",
    displayDate: "Jan 2020",
    description: "A Medium essay on learning software development effectively.",
    tags: ["Learning", "Software"],
    source: "Medium",
    contentPath: "writing/medium/the-correct-approach-to-learning-software-development-part-2.md",
    kind: "reflection",
    featured: false,
    url: "https://medium.com/@devagrawal09/the-correct-approach-to-learning-software-development-part-2-52b47450e099",
    analyticsEvent: "writing_click",
  },
  {
    slug: "medium-learning-software-development-part-1",
    title: "The correct approach to learning software development - Part 1",
    date: "2020-01-22",
    displayDate: "Jan 2020",
    description: "A Medium essay on learning software development effectively.",
    tags: ["Learning", "Software"],
    source: "Medium",
    contentPath: "writing/medium/the-correct-approach-to-learning-software-development-part-1.md",
    kind: "reflection",
    featured: false,
    url: "https://medium.com/@devagrawal09/the-correct-approach-to-learning-software-development-part-1-a4b252ff5533",
    analyticsEvent: "writing_click",
  },
  {
    slug: "medium-hitchd",
    title: "Hitch'd!",
    date: "2017-11-28",
    displayDate: "Nov 2017",
    description: "An early Medium post about the Hitch'd app project.",
    tags: ["Projects", "Apps"],
    source: "Medium",
    contentPath: "writing/medium/hitchd.md",
    kind: "reflection",
    featured: false,
    url: "https://medium.com/@devagrawal09/hitchd-27903ed39c20",
    analyticsEvent: "writing_click",
  },
  {
    slug: "medium-my-first-app-release-v0-1",
    title: "My First App - release v0.1",
    date: "2017-11-10",
    displayDate: "Nov 2017",
    description: "An early Medium update about releasing a first app.",
    tags: ["Projects", "Apps"],
    source: "Medium",
    contentPath: "writing/medium/my-first-app-release-v0-1.md",
    kind: "reflection",
    featured: false,
    url: "https://medium.com/@devagrawal09/my-first-app-release-v0-1-1ab0a0b1dfc",
    analyticsEvent: "writing_click",
  },
  {
    slug: "medium-my-first-app",
    title: "My First App",
    date: "2017-10-30",
    displayDate: "Oct 2017",
    description: "An early Medium post about building a first app.",
    tags: ["Projects", "Apps"],
    source: "Medium",
    contentPath: "writing/medium/my-first-app.md",
    kind: "reflection",
    featured: false,
    url: "https://medium.com/@devagrawal09/my-first-app-68fdda99eb2f",
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
    contentPath: "writing/review/senior.md",
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
    contentPath: "writing/review/junior.md",
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
    contentPath: "writing/review/pre-junior.md",
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
    contentPath: "writing/review/sophomore.md",
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
    contentPath: "writing/review/freshman.md",
    kind: "reflection",
    featured: false,
    analyticsEvent: "writing_click",
  },
];

/** Articles surfaced on the homepage writing highlights strip */
export const featuredArticles = ARTICLES.filter((a) => a.featured);

/** Complete article index — sorted newest-first */
export const sortedArticles = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

/** Technical deep-dives — sorted newest-first */
export const technicalArticles = ARTICLES.filter((a) => a.kind === "technical").sort((a, b) =>
  b.date.localeCompare(a.date)
);

/** Personal year-in-review reflections — sorted newest-first */
export const reflectionArticles = ARTICLES.filter((a) => a.kind === "reflection").sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const articleSources = Array.from(
  new Set(sortedArticles.map((article) => article.source ?? "Portfolio"))
);

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getLegacyWritingPath(slug: string) {
  const article = getArticleBySlug(slug);
  if (!article) return "/writing";
  if (article.url?.startsWith("/")) return article.url;
  if (article.contentPath || article.sections?.length) return `/writing/${article.slug}`;
  return `/writing#${article.slug}`;
}
