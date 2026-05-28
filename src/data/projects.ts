// Curated featured projects — the highest-signal work Dev has shipped.
// Import this file wherever project data is needed (homepage strip, work page, case studies, etc.).

import type { AnalyticsEvent } from "~/config/analytics";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Broad category used to group/filter projects on the work page. */
export type ProjectKind = "product" | "oss" | "civic" | "devrel";

export interface FeaturedProject {
  /** URL-safe identifier — used as a key and future route segment. */
  slug: string;
  title: string;
  /** Dev's specific role on this project */
  role: string;
  period: string;
  /** One-sentence hook shown in card/preview contexts */
  tagline: string;
  /** 2-3 sentences of context: what it is and why it matters */
  description: string;
  /** Key architectural decision or pattern worth highlighting */
  architecture: string;
  /** Concrete outcome, impact, or proof of value */
  outcome: string;
  /** Short tech identifiers for the tag strip */
  tech: string[];
  /** Primary link — live site, talk recording, or public demo */
  url?: string;
  /** Custom label for the primary link. Defaults to 'View project ↗' / 'View ↗' when absent. */
  urlLabel?: string;
  /** Source repository */
  repoUrl?: string;
  kind: ProjectKind;
  /** Whether to surface on the homepage featured-work strip */
  featured: boolean;
  /** Analytics event emitted when the user navigates into this project */
  analyticsEvent: Extract<AnalyticsEvent, "featured_work_click">;
  /** Route path for the detailed project page, e.g. "/projects/momentum-devcon" */
  caseStudyPath?: string;
  /** The core problem or constraint the project addressed — richer context for case study */
  challenges?: string;
  /** Key achievement bullets shown on the case study page */
  highlights?: string[];
  /** Proof items rendered on case studies */
  proofIds?: string[];
  /** Short public recognition notes */
  recognition?: string[];
  /** Public supporting links for project context */
  publicSources?: {
    label: string;
    href: string;
  }[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const PROJECTS: FeaturedProject[] = [
  {
    slug: "specter",
    title: "Specter",
    role: "Author",
    period: "May 2026 – Present",
    tagline: "TypeScript and Solid framework for vertically sliced, event-sourced applications.",
    description:
      "Framework for building specifications that compile, execute and scaffold applications around vertical features. The workspace includes the `@specter-ts/core` runtime, the `create-specter` project initializer, and a reference app that proves the framework API.",
    architecture:
      "Solid-oriented TypeScript core with Event Definitions, Command Slices, Query Slices, Reaction Slices, Slice State, and View contracts. Effect RPC exposes end-to-end typed command/query transport, Drizzle and SQLite persist event-derived state, and Vite packages the framework and initializer.",
    outcome:
      "Shipped the core framework package, initializer CLI, reference application, scenario-testing model, and architecture decisions needed to validate Specter's event-sourced development workflow before public release.",
    tech: [
      "TypeScript",
      "Solid",
      "Effect",
      "Effect RPC",
      "Drizzle",
      "SQLite",
      "Vite",
      "Event Sourcing",
    ],
    repoUrl: "https://github.com/devagrawal09/specter",
    kind: "oss",
    featured: true,
    analyticsEvent: "featured_work_click",
    caseStudyPath: "/projects/specter",
    challenges:
      "Event-sourced systems are powerful but often force teams to stitch together command handlers, read models, reactions, tests, and UI bindings by convention. Specter makes those boundaries explicit while keeping a Solid app understandable as vertical slices instead of scattered infrastructure code.",
    highlights: [
      "Defines a vertical-slice model around commands, queries, reactions, events, slice state, and views",
      "Uses Effect RPC for end-to-end typed command dispatch and query transport",
      "Includes `create-specter` so new projects can start from a working reference application",
      "Provides scenario tests that document slice behavior as executable examples",
    ],
    publicSources: [
      {
        label: "Source",
        href: "https://github.com/devagrawal09/specter",
      },
    ],
  },
  {
    slug: "momentum-devcon",
    title: "Momentum DevCon App",
    role: "Lead Developer",
    period: "2023 – Present",
    tagline:
      "Conference app for Cincinnati's largest developer conference — built on SolidStart with event sourcing and CQRS.",
    description:
      "A mobile-first web app for Momentum Developer Conference (500+ registrations). Attendees browse and bookmark sessions, provide real-time feedback, and connect with each other across the event. Built as a production SolidStart app proving out the framework in a live event context.",
    architecture:
      "Fullstack SolidStart with server rendering, optimistic UI, event sourcing, and CQRS. Drizzle + Postgres for the data layer, deployed on Vercel.",
    outcome:
      "Shipped to 500+ conference attendees. Serves as a production proof point for SolidStart's server-function and reactive-UI model in a real event app.",
    tech: ["SolidStart", "Drizzle", "Postgres", "Vercel", "Event Sourcing", "CQRS"],
    kind: "product",
    featured: true,
    analyticsEvent: "featured_work_click",
    caseStudyPath: "/projects/momentum-devcon",
    challenges:
      "Proving SolidStart's server-function model could handle real-time event logistics — session management, live feedback collection, and attendee coordination — under conference-day load with no room for downtime.",
    highlights: [
      "Shipped to 500+ attendees across two conference years with no day-of incidents",
      "Validated SolidStart server functions and optimistic UI in a live production context",
      "Event sourcing made real-time feedback auditable and replayable after each session",
      "Demonstrates that a solo build can match the polish of vendor conference apps",
    ],
    proofIds: ["speaking-appearances"],
  },
  {
    slug: "solid-socket",
    title: "Solid Socket",
    role: "Author",
    period: "Oct 2024 – Present",
    tagline:
      "Signals-meet-WebSockets experiment for SolidStart, with realtime server state exposed through familiar reactive APIs.",
    description:
      'An open source SolidStart extension that adds a `"use socket"` directive, turning exported functions into WebSocket-backed RPC and subscriptions. The demo is a collaborative TodoMVC app with username login, invite-based sharing, optimistic updates, presence indicators, and cookie-based access control.',
    architecture:
      "Splits socket modules into a stateful server bundle, serializes functions and reactive values across a WebSocket connection, and exposes `createSocketMemo`, socket stores/projections, persisted signals, and an event-log sync engine over Solid primitives.",
    outcome:
      "Published as a proof-of-concept for server-side reactivity in Solid. Won SolidHack 2024's Best SolidStart App category and shipped a live Railway demo that exercises realtime collaboration, persisted reactive state, and multi-user sync.",
    tech: ["SolidJS", "SolidStart", "WebSockets", "Vinxi", "TypeScript", "unstorage"],
    url: "https://solid-socket-production.up.railway.app/",
    urlLabel: "Live demo ↗",
    repoUrl: "https://github.com/devagrawal09/solid-socket",
    kind: "oss",
    featured: true,
    analyticsEvent: "featured_work_click",
    caseStudyPath: "/projects/solid-socket",
    challenges:
      "Most WebSocket integrations require glue code that breaks the reactive mental model. The goal was to make server-side reactive state feel identical to a local SolidJS signal — no explicit subscriptions, no fetch wrappers, no adapter boilerplate on the consumer side.",
    highlights: [
      'Introduces `"use socket"` files as a SolidStart-style directive for stateful server-side socket functions',
      "Server signals and memos synchronize to client components with no extra fetch or subscription code",
      "Includes a TodoMVC demo with invites, presence, optimistic updates, cookie auth, and reactive persistence",
      "Explores incremental projections and event-log sync as a foundation for local-first Solid apps",
    ],
    proofIds: ["oss-solid-socket", "award-solidhack", "oss-solid-core"],
    recognition: ["SolidHack 2024 Best SolidStart App winner"],
    publicSources: [
      {
        label: "SolidHack winner listing",
        href: "https://hack.solidjs.com/categories-challenges",
      },
      {
        label: "Live demo",
        href: "https://solid-socket-production.up.railway.app/",
      },
      {
        label: "Source",
        href: "https://github.com/devagrawal09/solid-socket",
      },
    ],
  },
  {
    slug: "solid-events",
    title: "Solid Events",
    role: "Author",
    period: "Oct 2024 – Present",
    tagline: "Declarative event composition and state derivation primitives for SolidJS.",
    description:
      "A published SolidJS library for modeling user events, async workflows, optimistic UI, and fine-grained mutations as explicit event pipelines. It fills the event-composition gap between pull-based Solid signals and heavier observable systems like RxJS.",
    architecture:
      "Provides `createEvent`, `createSubject`, `createAsyncSubject`, `createSubjectStore`, `createTopic`, and `createPartition`. Handlers compose into typed pipelines, can halt propagation, flatten promises, bind cleanup to Solid owners, and derive signal or store state from named events.",
    outcome:
      "Published on npm as `solid-events` and won the SolidHack 2024 Solid Primitive challenge. The README documents Strello-style drag-and-drop, optimistic deletion, and fine-grained board mutation flows rewritten around explicit event composition.",
    tech: ["SolidJS", "TypeScript", "RxJS", "Solid Primitives", "Vitest"],
    url: "https://www.npmjs.com/package/solid-events",
    urlLabel: "npm package ↗",
    repoUrl: "https://github.com/devagrawal09/solid-events",
    kind: "oss",
    featured: true,
    analyticsEvent: "featured_work_click",
    caseStudyPath: "/projects/solid-events",
    challenges:
      "Complex Solid apps can end up with procedural event handlers that mix validation, state mutation, side effects, and optimistic behavior in one block. solid-events makes the decision points explicit so state changes are visible at declaration time instead of hidden behind scattered setters.",
    highlights: [
      "Defines typed event handlers that can transform payloads, halt propagation, and flatten async callbacks",
      "Derives signal and store state from named events with automatic Solid owner cleanup",
      "Composes and partitions events so validation, side effects, and UI state become separate readable steps",
      "Simplifies optimistic UI and fine-grained mutations by applying each event directly to derived state",
    ],
    proofIds: ["oss-solid-events", "award-solidhack", "oss-solid-core"],
    recognition: ["SolidHack 2024 Solid Primitive challenge winner"],
    publicSources: [
      {
        label: "npm package",
        href: "https://www.npmjs.com/package/solid-events",
      },
      {
        label: "Source",
        href: "https://github.com/devagrawal09/solid-events",
      },
      {
        label: "Strello demo implementation",
        href: "https://github.com/devagrawal09/strello/pull/1/files",
      },
    ],
  },
  {
    slug: "qbridge",
    title: "QBridg",
    role: "Product Engineer",
    period: "2024",
    tagline:
      "Mastra-powered MCP assistant for quantum research, optimization workflows, and TerraQuantum knowledge access.",
    description:
      "QBridg is an internal AI assistant that gives users conversational and tool-based access to TerraQuantum research assets, solution portfolios, and workflow demos. It exposes research analysis, dataset assessment, model reproduction, and vehicle-routing optimization through agent chat and direct tool APIs.",
    architecture:
      "Built with Mastra agents, MCP server connectors, OpenAI models, LibSQL-backed memory, vector storage, and typed tool specifications. The MCP contract includes search/execute validation helpers so surfaced tools can be tested against use-case prompts before being exposed to downstream clients.",
    outcome:
      "Produced an internal-preview assistant with persistent conversational memory, workflow telemetry, typed MCP tool specs, and integration paths for optimization documentation and demo workflows without requiring users to learn the underlying platform APIs.",
    tech: ["Mastra", "MCP", "TypeScript", "LibSQL", "OpenAI", "Zod", "Nexus"],
    kind: "product",
    featured: true,
    analyticsEvent: "featured_work_click",
    caseStudyPath: "/projects/qbridge",
    challenges:
      "Technical research and optimization capabilities are hard to surface through a single UI because users need knowledge retrieval, guided workflows, and executable tools. QBridg packages those capabilities behind MCP so agents can discover the right tool and run the next step from natural-language intent.",
    highlights: [
      "Connected Mastra agents to MCP servers for research and optimization tool discovery",
      "Modeled tool contracts with input/output schemas, examples, and use-case tests",
      "Used LibSQL for conversation memory, workflow persistence, telemetry, and vector-backed recall",
      "Covered dataset analysis, ML/quantum-readiness assessment, model benchmarking, and VRP optimization demos",
    ],
    proofIds: ["project-qbridge"],
  },
  {
    slug: "qai-hub",
    title: "QAI Hub",
    role: "Product Engineer",
    period: "2025",
    tagline:
      "Event-sourced machine-learning workflow app for dataset preparation and model configuration.",
    description:
      "QAI Hub is a full-stack app for guiding users through AI/ML experiment setup: uploading datasets, detecting and editing schemas, generating cleaning recommendations, processing cleaned data, and configuring model-training runs. The product turns a multi-step ML workflow into explicit screens and recoverable state transitions.",
    architecture:
      "React Router 7 app backed by KurrentDB event streams. Dataset and model workflows are represented as command functions that append domain events, while projections rebuild current state for route loaders and redirect users to the next incomplete step.",
    outcome:
      "Shipped the core workflow shell for dataset upload/cleaning and model configuration, including API/gRPC service definitions for dataset jobs and event-derived progress state across each wizard step.",
    tech: ["React Router", "React", "TypeScript", "KurrentDB", "Event Sourcing", "Tailwind"],
    kind: "product",
    featured: true,
    analyticsEvent: "featured_work_click",
    caseStudyPath: "/projects/qai-hub",
    challenges:
      "ML platform flows often hide critical decisions in backend jobs or one-off form state. QAI Hub makes each step auditable by storing uploads, schema edits, cleaning recommendations, processing milestones, model choices, layer config, loss functions, metrics, hyperparameters, and compute selections as domain events.",
    highlights: [
      "Modeled dataset setup as events for creation, upload, schema detection, schema edits, cleaning recommendations, confirmation, and processing",
      "Modeled model configuration as events for model type, layers, loss, metrics, tunable hyperparameters, and compute size",
      "Used projections to rebuild current workflow state and route users to the next incomplete step",
      "Documented dataset upload, recommendation, cleaning, state, list, and gRPC service contracts",
    ],
    proofIds: ["project-qbridge"],
  },
  {
    slug: "osdp",
    title: "Ohio Sentencing Data Platform",
    role: "Senior Developer",
    period: "2020 – 2022",
    tagline:
      "Civic data platform built with the Ohio Supreme Court to record and analyze criminal sentencing across 10+ counties.",
    description:
      "A full-stack JavaScript platform for collecting and analyzing criminal sentencing data from courts across Ohio. Built in direct collaboration with the Ohio Supreme Court and 10+ counties. Serves public transparency, practitioner decision-support, and research use cases.",
    architecture:
      "Vertical-slice monolith with a REST API and SPA frontend. Core feature: a custom JSON-schema-driven form engine that generates complex court forms with real-time capabilities, analyzable data outputs, and docx exports. Integrates with legacy court systems.",
    outcome:
      "Deployed to production serving Ohio courts and the Supreme Court. Data collected informs felony sentencing decisions statewide and is publicly accessible for researchers.",
    tech: ["Node.js", "Express", "React", "PostgreSQL", "MongoDB", "Linux"],
    url: "https://courtnewsohio.gov/happening/2021/sentencingDataPlatform_062521.asp",
    urlLabel: "Official coverage ↗",
    kind: "civic",
    featured: true,
    analyticsEvent: "featured_work_click",
    caseStudyPath: "/projects/osdp",
    challenges:
      "Ohio court systems are fragmented — different counties use different formats, some still paper-based. The platform had to collect structured, analyzable sentencing data without disrupting judge and clerk workflows or requiring courts to adopt new infrastructure.",
    highlights: [
      "Deployed to production serving the Ohio Supreme Court and 10+ county courts",
      "JSON-schema-driven form engine handles complex multi-step court forms dynamically",
      "Collected data informs felony sentencing decisions statewide",
      "Publicly accessible dataset used by academic researchers and policy analysts",
    ],
    proofIds: ["project-osdp"],
    publicSources: [
      {
        label: "Court News Ohio coverage",
        href: "https://courtnewsohio.gov/happening/2021/sentencingDataPlatform_062521.asp",
      },
    ],
  },
  {
    slug: "hackathon-suite",
    title: "Hackathon Suite",
    role: "Lead Developer",
    period: "2019 – 2023",
    tagline:
      "9-component platform powering RevolutionUC and MakeUC — registration, judging, hacker matching, and Discord automation.",
    description:
      "A suite of applications and services supporting UC's largest student hackathons across four years and multiple virtual and in-person formats. Grew from a small tool into a platform covering the full event lifecycle under technical leadership.",
    architecture:
      "Service-oriented backend across AWS, Heroku, Netlify, and Cloudflare. Frontends in Jekyll, React, and Angular. NestJS + Postgres API server. Includes a Discord bot, email processing server, Tinder-style team-matching algorithm, and live Chart.js stats dashboard.",
    outcome:
      "Ran multiple annual hackathons for hundreds of participants. Led a team through expansion from a single codebase to a 9-component platform.",
    tech: ["NestJS", "Postgres", "React", "Angular", "AWS", "Discord.js", "Chart.js"],
    repoUrl: "https://github.com/revolutionUC/",
    kind: "product",
    featured: false,
    analyticsEvent: "featured_work_click",
    caseStudyPath: "/projects/hackathon-suite",
    challenges:
      "Running a student hackathon once a year is demanding; running multiple formats (virtual and in-person) across four years while growing a volunteer team required building a platform that could evolve as fast as the events did.",
    highlights: [
      "Grew from a single registration tool to a 9-component platform over four years",
      "Led a volunteer engineering team through virtual and in-person hackathon formats",
      "Built a Tinder-style team-matching algorithm for hundreds of participants",
      "Automated Discord server setup, role assignment, and participant communication end-to-end",
    ],
    proofIds: ["project-hackathon-suite"],
    publicSources: [
      {
        label: "RevolutionUC GitHub",
        href: "https://github.com/revolutionUC/",
      },
    ],
  },
];
