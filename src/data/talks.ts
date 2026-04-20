// Structured appearances data, sourced from ../appearances.md.
// Edit appearances.md at the repo root and mirror changes here.

export type AppearanceKind = "conference" | "podcast" | "meetup";

export interface Appearance {
  title: string;
  /** Name of the conference, show, or meetup series */
  event: string;
  location: string;
  /** Human-readable date, e.g. "Jan 2025" or "Nov 2021 – Mar 2022" */
  date: string;
  url?: string;
  kind: AppearanceKind;
  isWorkshop?: boolean;
}

// Listed newest-first within each kind.
export const appearances: Appearance[] = [
  // ─── Conferences ────────────────────────────────────────────────────────────
  {
    title: "Meet The Web Framework From The Future",
    event: "Frontend Nation",
    location: "Virtual",
    date: "Jun 2025",
    kind: "conference",
  },
  {
    title: "Sync engine's best friend: fine-grained rendering",
    event: "Local First Conf",
    location: "Berlin, Germany",
    date: "May 2025",
    kind: "conference",
  },
  {
    title: "Building Asynchronous UIs Without The Hassle",
    event: "Stir Trek",
    location: "Columbus, OH",
    date: "May 2025",
    url: "https://www.youtube.com/watch?v=N1wSVaUdV_U",
    kind: "conference",
  },
  {
    title: "Building Asynchronous UIs Without The Hassle",
    event: "Codemash",
    location: "Sandusky, OH",
    date: "Jan 2025",
    url: "https://www.youtube.com/watch?v=pX5r_jTLbvw",
    kind: "conference",
  },
  {
    title: "Harnessing Events for Reactive and AI-powered Frontends",
    event: "EDA Summit",
    location: "Virtual",
    date: "Dec 2024",
    url: "https://edasummit.com/videos/harnessing-events-for-reactive-and-ai-powered-frontends/",
    kind: "conference",
  },
  {
    title: "Deploying Stateful Realtime Services To The Edge",
    event: "Commit Your Code Conference",
    location: "Dallas, TX",
    date: "Dec 2024",
    url: "https://www.youtube.com/live/_cCmh-FrYeM?si=05mwvnxDxbZ_EAtx&t=2133",
    kind: "conference",
  },
  {
    title: "Meet the Web Framework from the Future",
    event: "Dev Innovation Summit",
    location: "Santa Clara, CA",
    date: "Nov 2024",
    kind: "conference",
  },
  {
    title: "Build your own React Metaframework",
    event: "React Rally",
    location: "Salt Lake City, UT",
    date: "Aug 2024",
    url: "https://www.youtube.com/watch?v=4V_Wz_k35C8",
    kind: "conference",
  },
  {
    title: "Streams, not Waterfalls — Improving Page Load and Core Web Vitals",
    event: "Stir Trek",
    location: "Columbus, OH",
    date: "May 2024",
    url: "https://www.youtube.com/watch?v=GrJVK6ci--s",
    kind: "conference",
  },
  {
    title: "Meet Your New BFF: Backend to Frontend without the Duct Tape",
    event: "Codemash",
    location: "Sandusky, OH",
    date: "Jan 2024",
    kind: "conference",
  },
  {
    title: "Workshop — Build an end-to-end Next.js app with auth and realtime",
    event: "Codemash",
    location: "Sandusky, OH",
    date: "Jan 2024",
    kind: "conference",
    isWorkshop: true,
  },
  {
    title: "Workshop — From Todo App to B2B SaaS with Next.js and Clerk",
    event: "React Summit US",
    location: "Jersey City, NJ",
    date: "Dec 2023",
    url: "https://gitnation.com/contents/from-todo-app-to-b2b-saas-with-nextjs-and-clerk",
    kind: "conference",
    isWorkshop: true,
  },
  {
    title: "Beyond the Login Page: Authentication in Next.js",
    event: "Next.js Conf",
    location: "San Francisco, CA",
    date: "Oct 2023",
    url: "https://www.youtube.com/watch?v=44b2U0uGQ0k",
    kind: "conference",
  },
  {
    title: "Meet Your New BFF: Fullstack without Duct Tape",
    event: "APIWorld",
    location: "Santa Clara, CA",
    date: "Oct 2023",
    kind: "conference",
  },
  {
    title: "Meet Your New BFF: Fullstack without Duct Tape",
    event: "JavaScript and Friends",
    location: "Columbus, OH",
    date: "Aug 2023",
    url: "https://www.youtube.com/watch?v=vAKwSEzj7sY",
    kind: "conference",
  },

  // ─── Podcasts ────────────────────────────────────────────────────────────────
  {
    title: "Building Async UIs without the hassle",
    event: "PodRocket",
    location: "Virtual",
    date: "Feb 2025",
    url: "https://podrocket.logrocket.com/building-async-uis-without-the-hassle-dev-agrawal",
    kind: "podcast",
  },
  {
    title: "Solid.js IS REALLY FAST! Concept breakdown",
    event: "The Programming Podcast",
    location: "Virtual",
    date: "Jan 2025",
    url: "https://www.youtube.com/watch?v=TwpcWoZCQ_4",
    kind: "podcast",
  },
  {
    title: "Realtime Frameworks",
    event: "AJC and the Web Devs",
    location: "Virtual",
    date: "Dec 2024",
    url: "https://www.youtube.com/live/q8AlF3QcR2M?si=hdyr5Gu8ie0Lcsbx",
    kind: "podcast",
  },
  {
    title: "Nitro, Vinxi, and RSCs",
    event: "What's Good (Egghead.io)",
    location: "Virtual",
    date: "Sep 2024",
    url: "https://egghead.io/nitro-vinxi-and-rscs-whats-good-with-dev-agrawal~s577t",
    kind: "podcast",
  },
  {
    title: "Build your own metaframework with Vinxi",
    event: "Learn With Jason",
    location: "Virtual",
    date: "Jul 2024",
    url: "https://www.youtube.com/live/2m9ErnaDy6s?si=o5XAnyr0XzDzXFXD",
    kind: "podcast",
  },
  {
    title: "What's New in React 19 (and What That Means for You)",
    event: "Scrimba Podcast",
    location: "Virtual",
    date: "Jun 2024",
    url: "https://www.youtube.com/watch?v=8GuvVaEWjzk",
    kind: "podcast",
  },
  {
    title: "Local-First Application Development is Back?",
    event: "Modern Web Podcast",
    location: "Virtual",
    date: "May 2024",
    url: "https://www.youtube.com/watch?v=0bYeHVAk_EM",
    kind: "podcast",
  },
  {
    title: "The State of React (and Should You Still Learn It in 2024)",
    event: "Scrimba Podcast",
    location: "Virtual",
    date: "Feb 2024",
    url: "https://www.youtube.com/watch?v=nD1V18VBNcw",
    kind: "podcast",
  },
  {
    title: "From College Student to Speaking at Conferences",
    event: "Guidance Counselor 2.0",
    location: "Virtual",
    date: "Feb 2024",
    url: "https://www.linkedin.com/posts/taylordesseyn_from-college-student-to-speaking-at-conferences-activity-7163192438377926657-VOoy",
    kind: "podcast",
  },
  {
    title: "I got CAUGHT rolling my own auth..",
    event: "Backend Banter",
    location: "Virtual",
    date: "Jan 2024",
    url: "https://www.youtube.com/watch?v=xjcvlddL398",
    kind: "podcast",
  },
  {
    title: "Clerk, Authentication, Web Dev, All the Things",
    event: "Nicky T Live",
    location: "Virtual",
    date: "Sep 2023",
    url: "https://www.youtube.com/watch?v=vlxkTAzNm5Y",
    kind: "podcast",
  },

  // ─── Meetups ─────────────────────────────────────────────────────────────────
  {
    title: "Sign-in Sessions: The most powerful authentication tool",
    event: "Certified Fresh Events",
    location: "Virtual",
    date: "Sep 2023",
    url: "https://www.youtube.com/watch?v=MYIIuF1ELxM",
    kind: "meetup",
  },
  {
    title: "Intro to modern Cloud services",
    event: "ACM@UC",
    location: "Cincinnati, OH",
    date: "Nov 2022",
    url: "https://www.youtube.com/watch?v=EyGMpEgmRMo",
    kind: "meetup",
  },
  {
    title: "Workshop — React Dojo",
    event: "ITSA + CECH Tribunal",
    location: "Cincinnati, OH",
    date: "Nov 2021 – Mar 2022",
    kind: "meetup",
    isWorkshop: true,
  },
  {
    title: "Abstraction in Programming",
    event: "ACM@UC + ITSA",
    location: "Cincinnati, OH",
    date: "Oct 2021",
    url: "https://www.youtube.com/watch?v=cdssceyEbSU",
    kind: "meetup",
  },
  {
    title: "Docker Intro Session",
    event: "ACM@UC",
    location: "Virtual",
    date: "Mar 2020",
    url: "https://www.youtube.com/live/7c8AuQ0Nljs?si=Dak20j06WtR96Nf5",
    kind: "meetup",
  },
];

export const conferences = appearances.filter((a) => a.kind === "conference");
export const podcasts = appearances.filter((a) => a.kind === "podcast");
export const meetups = appearances.filter((a) => a.kind === "meetup");
