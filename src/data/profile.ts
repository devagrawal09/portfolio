// Structured content derived from resume.md.
// The About page and any other page that needs biography/work data imports from here.
// Keep this file factual and up-to-date; avoid narrative that belongs on the page itself.

// ─── Work experience ──────────────────────────────────────────────────────────

export interface WorkRole {
  company: string;
  title: string;
  period: string;
  current?: boolean;
  highlights: string[];
  /** Primary technologies used — short identifiers only */
  tech: string[];
}

export const WORK_ROLES: WorkRole[] = [
  {
    company: "Xolvio",
    title: "Software Engineer",
    period: "Apr 2025 – Present",
    current: true,
    highlights: [
      "Building a machine learning platform for analysts running quantum algorithms",
      "Working with cutting-edge Event Sourcing, GraphQL, and AI technologies",
    ],
    tech: ["React Router", "Apollo GraphQL", "KurrentDB", "Emmett", "Google Cloud"],
  },
  {
    company: "SmartData",
    title: "Software Engineer",
    period: "Apr 2024 – Apr 2025",
    highlights: [
      "Built an AI-powered project management assistant to accelerate internal processes",
      "Built a next-gen member application for a healthcare company",
      "Implemented critical improvements for performance, developer experience, and cost efficiency",
    ],
    tech: ["TanStack", "Remix", "React", "Azure", "Okta"],
  },
  {
    company: "Clerk",
    title: "Developer Advocate",
    period: "May 2023 – Feb 2024",
    highlights: [
      "Helped establish Clerk in the community during the hockey-stick growth period (5× managed users, 3× downloads, 2× company size, Series A and B)",
      "Engaged and supported a Discord community of 8k members and Twitter community of 14k followers",
      "Solidified Clerk's presence at 5 conferences through talks, workshops, demos, and product walkthroughs",
      "Curated community feedback to help prioritize work for the engineering team",
    ],
    tech: ["Next.js", "React", "TailwindCSS", "Vercel"],
  },
  {
    company: "UC IT Solutions Center",
    title: "Senior Software Developer",
    period: "Jan 2020 – Dec 2022",
    highlights: [
      "Led development of the Ohio Sentencing Data Platform in collaboration with the Ohio Supreme Court and 10+ counties",
      "Developed a suite of applications used by UC Corrections Institute and Department of Youth Services",
      "Identified and triaged project requirements in collaboration with key stakeholders",
    ],
    tech: ["Node.js", "Express", "React", "PostgreSQL", "MongoDB", "Linux"],
  },
  {
    company: "University of Cincinnati",
    title: "Research Assistant",
    period: "Sep 2018 – Dec 2019",
    highlights: [
      "Worked on an NSF- and Mozilla-funded research project with professors and graduate students",
      "Built an access control model for smart homes with automatic emergency detection, escalation, and response",
      "Published a paper at the ACM International Conference on Enhancing Smart Home Security",
    ],
    tech: [],
  },
];

// ─── Open source ──────────────────────────────────────────────────────────────
// Canonical list — imported by About page and cross-referenced by home.ts.

export interface OssContribution {
  name: string;
  role: string;
  since: string;
  url: string;
  description: string;
}

export const OSS_CONTRIBUTIONS: OssContribution[] = [
  {
    name: "Solid.js",
    role: "Core Team",
    since: "Dec 2024",
    url: "https://github.com/solidjs/solid",
    description:
      "Core team member of the reactive UI framework — contributing to APIs, docs, and ecosystem direction.",
  },
  {
    name: "TanStack Start",
    role: "Maintainer",
    since: "Jun 2024",
    url: "https://github.com/TanStack/router",
    description:
      "Maintaining the fullstack SolidJS adapter for TanStack's type-safe router and server functions.",
  },
  {
    name: "solid-socket",
    role: "Author",
    since: "Oct 2024",
    url: "https://github.com/devagrawal09/solid-socket",
    description:
      "Library enabling server-side reactive primitives and real-time sync for SolidJS applications.",
  },
  {
    name: "solid-events",
    role: "Author",
    since: "Oct 2024",
    url: "https://github.com/devagrawal09/solid-events",
    description:
      "Event-driven primitives for SolidJS — composable, type-safe event emitters and listeners.",
  },
  {
    name: "crossws",
    role: "Contributor",
    since: "Nov 2024",
    url: "https://github.com/h3js/crossws",
    description:
      "Cross-runtime WebSocket adapter, now under the h3js org, used under the hood in Nitro and H3.",
  },
];

// ─── Community ────────────────────────────────────────────────────────────────

export interface CommunityRole {
  org: string;
  role: string;
  period: string;
  description: string;
}

export const COMMUNITY_ROLES: CommunityRole[] = [
  {
    org: "Momentum Developer Conference",
    role: "Organizer",
    period: "Feb 2023 – Present",
    description:
      "Steering committee member for Cincinnati's largest tech conference (500+ registrations). Built the attendee + speaker app.",
  },
  {
    org: "RevolutionUC & MakeUC",
    role: "Organizer",
    period: "Sep 2019 – Mar 2023",
    description:
      "Organized UC's largest hackathons — built and managed the website, server, database, and online services.",
  },
  {
    org: "IT Student Association @ UC",
    role: "President",
    period: "Apr 2021 – Apr 2022",
    description:
      "Led UC's largest student IT organization, providing weekly educational and networking events.",
  },
];

// ─── Education ────────────────────────────────────────────────────────────────

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  notes: string[];
}

export const EDUCATION: EducationEntry = {
  degree: "BS in Information Technology, Software Development",
  school: "University of Cincinnati",
  period: "Aug 2018 – May 2023",
  notes: ["GPA 3.5", "Minor in Psychology", "University Honors Program"],
};
