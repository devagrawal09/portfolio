const SOCIAL_LINKS = {
  github: "https://github.com/devagrawal09",
  linkedin: "https://www.linkedin.com/in/dev-agr",
  twitter: "https://x.com/devagrawal09",
  twitterHandle: "@devagrawal09",
  youtube: "https://youtube.com/@devagr",
} as const;

const PROFILE_LINKS = [
  SOCIAL_LINKS.github,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.twitter,
  SOCIAL_LINKS.youtube,
] as const;

export const SITE = {
  name: "Dev Agrawal",
  handle: "devagr.me",
  description:
    "Software engineer, fullstack developer, and open-source contributor building with SolidJS and the modern web.",
  url: "https://devagr.me",
  og: { image: "/og.svg" },
  social: SOCIAL_LINKS,
  profile: {
    jobTitle: "Software Engineer & Fullstack Developer",
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
