// Typed content configuration for the homepage.
// Edit this file to update hero copy, proof stats, OSS items, now items, and CTAs.
// Featured talks are derived directly from ~/data/talks to avoid duplication.
import type { AnalyticsEvent } from "~/config/analytics";
import { CONTACT_EMAIL_HREF, SPEAKING_EMAIL_HREF } from "~/data/contact";

// ─── Hero ─────────────────────────────────────────────────────────────────────

export interface HeroCta {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  analyticsEvent: AnalyticsEvent;
  /** Open in a new tab — use only for external links */
  external?: boolean;
}

export const HERO = {
  name: "Dev Agrawal",
  eyebrow: "Fullstack · OSS · Speaker",
  headline: "Building demos, systems, and developer experiences for the modern web.",
  subline:
    "I'm a Software Engineer at Xolvio — building event-sourced systems and fullstack apps, while contributing to the Solid.js and TanStack ecosystems.",
  ctas: [
    {
      label: "View my work",
      href: "/work",
      variant: "primary",
      analyticsEvent: "cta_work",
    },
    {
      label: "See talks",
      href: "/talks",
      variant: "secondary",
      analyticsEvent: "cta_talks",
    },
  ] satisfies HeroCta[],
} as const;

// ─── Proof bar ────────────────────────────────────────────────────────────────

export interface ProofStat {
  /** Large number or short label shown at the top */
  stat: string;
  /** Descriptor line below the stat */
  label: string;
}

/** Numbers derived from structured data in ~/data/talks.ts (31 total appearances). */
export const PROOF_STATS: ProofStat[] = [
  { stat: "31+", label: "Talks & Appearances" },
  { stat: "Core Team", label: "Solid.js" },
  { stat: "Maintainer", label: "TanStack Start" },
  { stat: "Engineer", label: "Xolvio" },
];

// ─── OSS / ecosystem section ──────────────────────────────────────────────────

export interface OssItem {
  name: string;
  role: string;
  since: string;
  url: string;
}

export const OSS_ITEMS: OssItem[] = [
  {
    name: "Solid.js",
    role: "Core Team",
    since: "Dec 2024",
    url: "https://github.com/solidjs/solid",
  },
  {
    name: "TanStack Start",
    role: "Maintainer",
    since: "Jun 2024",
    url: "https://github.com/TanStack/router",
  },
  {
    name: "solid-socket",
    role: "Author",
    since: "Oct 2024",
    url: "https://github.com/devagrawal09/solid-socket",
  },
  {
    name: "solid-events",
    role: "Author",
    since: "Oct 2024",
    url: "https://github.com/devagrawal09/solid-events",
  },
  {
    name: "crossws",
    role: "Contributor",
    since: "Nov 2024",
    url: "https://github.com/unjs/crossws",
  },
];

// ─── "Now" / current focus ────────────────────────────────────────────────────

export const NOW_ITEMS: string[] = [
  "Building an event-sourced ML platform at Xolvio with GraphQL, React, and Google Cloud",
  "Maintaining TanStack Start and contributing to the Solid.js core",
  "Speaking at conferences on async UI, sync engines, and modern fullstack patterns",
  "Exploring offline-first architecture, reactive data, and developer tooling",
];

// ─── CTA footer ───────────────────────────────────────────────────────────────

export interface FooterCta {
  label: string;
  description: string;
  href: string;
  variant: "primary" | "secondary";
  analyticsEvent: AnalyticsEvent;
}

export const FOOTER_CTAS: FooterCta[] = [
  {
    label: "Invite me to speak",
    description: "Looking for a conference or podcast guest?",
    href: SPEAKING_EMAIL_HREF,
    variant: "primary",
    analyticsEvent: "cta_speaking",
  },
  {
    label: "Work with me",
    description: "Building something interesting? Let's talk.",
    href: CONTACT_EMAIL_HREF,
    variant: "secondary",
    analyticsEvent: "cta_contact",
  },
];
