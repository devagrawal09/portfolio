export const SITE = {
  name: "Dev Agrawal",
  handle: "devagr.me",
  description:
    "DevRel engineer, fullstack developer, and open-source contributor building with SolidJS and the modern web.",
  url: "https://devagr.me",
  og: { image: "/og.png" },
  social: {
    github: "https://github.com/devagrawal09",
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
