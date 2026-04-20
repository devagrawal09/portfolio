// Central typed profile/contact configuration.
// Import EMAIL and the channel/social arrays from here instead of hard-coding
// contact details in individual routes or data files.

import type { AnalyticsEvent, AnalyticsProperties } from "~/config/analytics";
import { SITE } from "~/config/site";

// ─── Email ────────────────────────────────────────────────────────────────────

export const EMAIL = SITE.profile.email;
export const SPEAKING_EMAIL_HREF = `mailto:${EMAIL}?subject=Speaking%20inquiry`;
export const CONTACT_EMAIL_HREF = `mailto:${EMAIL}`;

// ─── Intent channels ─────────────────────────────────────────────────────────

export interface ContactChannel {
  label: string;
  description: string;
  href: string;
  analyticsEvent: AnalyticsEvent;
  analyticsProps: AnalyticsProperties;
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    label: "Invite me to speak",
    description:
      "Conferences, podcasts, workshops — I speak on async UI, sync engines, local-first architecture, and modern fullstack patterns.",
    href: SPEAKING_EMAIL_HREF,
    analyticsEvent: "cta_speaking",
    analyticsProps: { location: "contact_page", channel: "email" },
  },
  {
    label: "Work with me",
    description:
      "Working on something in the Solid or TanStack ecosystem? Open to engineering collaboration, architecture discussions, and technical project conversations.",
    href: CONTACT_EMAIL_HREF,
    analyticsEvent: "cta_contact",
    analyticsProps: { location: "contact_page", channel: "email" },
  },
];

// ─── Social profiles ──────────────────────────────────────────────────────────

export interface SocialProfile {
  label: string;
  url: string;
  handle: string;
  analyticsProps: AnalyticsProperties;
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    label: "GitHub",
    url: SITE.social.github,
    handle: "@devagrawal09",
    analyticsProps: { location: "contact_page", network: "github" },
  },
  {
    label: "LinkedIn",
    url: SITE.social.linkedin,
    handle: "devagrawal09",
    analyticsProps: { location: "contact_page", network: "linkedin" },
  },
  {
    label: "X / Twitter",
    url: SITE.social.twitter,
    handle: SITE.social.twitterHandle,
    analyticsProps: { location: "contact_page", network: "twitter" },
  },
  {
    label: "YouTube",
    url: SITE.social.youtube,
    handle: "@devagr",
    analyticsProps: { location: "contact_page", network: "youtube" },
  },
];
