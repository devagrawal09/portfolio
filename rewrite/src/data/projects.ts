// Curated featured projects — the highest-signal work Dev has shipped.
// Import this file wherever project data is needed (homepage strip, work page, etc.).
// Case-study sub-pages are out of scope for now; add a caseStudyPath field when ready.

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
  /** Source repository */
  repoUrl?: string;
  kind: ProjectKind;
  /** Whether to surface on the homepage featured-work strip */
  featured: boolean;
  /** Analytics event emitted when the user navigates into this project */
  analyticsEvent: Extract<AnalyticsEvent, "featured_work_click">;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const PROJECTS: FeaturedProject[] = [
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
  },
  {
    slug: "solid-socket",
    title: "solid-socket",
    role: "Author",
    period: "Oct 2024 – Present",
    tagline:
      "OSS library extending SolidJS reactivity to the server for real-time, WebSocket-backed sync.",
    description:
      "An open source library that brings SolidJS reactive primitives to the server side, letting server state synchronize directly to client components over WebSocket connections — without extra data-fetching boilerplate.",
    architecture:
      "Bridges SolidJS signals with server-side reactive state via crossws WebSocket adapters. Exposes a component-friendly API so subscriptions look identical to local reactive reads.",
    outcome:
      "Published on npm. Referenced as a proof-of-concept for server-side reactivity patterns in the Solid ecosystem and used in community talks on async UI and sync engines.",
    tech: ["SolidJS", "SolidStart", "WebSockets", "crossws", "TypeScript"],
    url: "https://github.com/devagrawal09/solid-socket",
    repoUrl: "https://github.com/devagrawal09/solid-socket",
    kind: "oss",
    featured: true,
    analyticsEvent: "featured_work_click",
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
    url: "https://ohiosentencingdata.info/",
    kind: "civic",
    featured: true,
    analyticsEvent: "featured_work_click",
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
  },
];

/** Projects surfaced on the homepage featured-work strip (featured: true). */
export const homepageFeatured = PROJECTS.filter((p) => p.featured);
