const SOCIAL_LINKS = {
  github: "https://github.com/devagrawal09",
  linkedin: "https://www.linkedin.com/in/devagrawal09",
  twitterHandle: "@devagrawal09",
} as const;

const PROFILE_LINKS = [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin] as const;

export const SITE = {
  name: "Dev Agrawal",
  handle: "devagr.me",
  description:
    "DevRel engineer, fullstack developer, and open-source contributor building with SolidJS and the modern web.",
  url: "https://devagr.me",
  og: { image: "/og.svg" },
  social: SOCIAL_LINKS,
  profile: {
    jobTitle: "DevRel Engineer & Fullstack Developer",
    email: "contact@devagr.me",
    sameAs: PROFILE_LINKS,
  },
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Talks", href: "/talks" },
  { label: "Open Source", href: "/open-source" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
