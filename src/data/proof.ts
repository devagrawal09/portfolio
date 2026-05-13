export type ProofCategory =
  | "speaking"
  | "open-source"
  | "research"
  | "award"
  | "project-impact"
  | "community";

export interface ProofSource {
  label: string;
  href?: string;
  sourceType: "public" | "internal-approved" | "needs-verification";
}

export interface ProofItem {
  id: string;
  category: ProofCategory;
  metric?: string;
  label: string;
  description: string;
  context?: string;
  sources: ProofSource[];
  featured?: boolean;
  relatedProjectSlugs?: string[];
  relatedAppearanceTitles?: string[];
}

export const PROOF_ITEMS: ProofItem[] = [
  {
    id: "speaking-appearances",
    category: "speaking",
    metric: "31+",
    label: "Talks & appearances",
    description:
      "Conference talks, podcast guest spots, workshops, and meetups on SolidJS, TanStack, async UI, local-first development, authentication, and fullstack architecture.",
    context: "Public speaking across conferences, podcasts, workshops, and community events.",
    sources: [{ label: "Talks page", href: "/talks", sourceType: "public" }],
    featured: true,
  },
  {
    id: "speaking-frontend-nation",
    category: "speaking",
    metric: "50k+",
    label: "Frontend Nation reach",
    description:
      "Spoke at Frontend Nation 2025, a free online frontend conference with public sponsor material describing 50,000+ developer reach.",
    context: "Large virtual frontend audience.",
    sources: [
      {
        label: "Frontend Nation",
        href: "https://frontendnation.com/",
        sourceType: "public",
      },
    ],
    relatedAppearanceTitles: ["Meet The Web Framework From The Future"],
  },
  {
    id: "speaking-local-first",
    category: "speaking",
    metric: "Berlin",
    label: "Local-first systems",
    description:
      "Presented at Local First Conf 2025 in Berlin on fine-grained rendering as a foundation for sync engines and local-first applications.",
    context: "International in-person conference for local-first builders.",
    sources: [
      {
        label: "Local First Conf 2025",
        href: "https://www.localfirstconf.com/local-first-conf-2025",
        sourceType: "public",
      },
    ],
    relatedAppearanceTitles: ["Sync engine's best friend: fine-grained rendering"],
  },
  {
    id: "oss-solid-core",
    category: "open-source",
    metric: "Core team",
    label: "Solid.js",
    description:
      "Core team member in the Solid.js ecosystem, contributing to the framework, SolidStart, docs, ecosystem direction, and community engineering support.",
    context: "Reactive UI framework and fullstack ecosystem work.",
    sources: [
      { label: "Solid.js", href: "https://github.com/solidjs/solid", sourceType: "public" },
    ],
    featured: true,
    relatedProjectSlugs: ["solid-socket", "solid-events", "solid-2"],
  },
  {
    id: "oss-tanstack-start",
    category: "open-source",
    metric: "Maintainer",
    label: "TanStack Start",
    description:
      "Maintainer and contributor around TanStack Start's fullstack framework work, including Solid-related routing, server-function, and documentation surfaces.",
    context: "Type-safe fullstack framework ecosystem.",
    sources: [
      {
        label: "TanStack Start contributors",
        href: "https://tanstack.com/start/v0/docs/contributors",
        sourceType: "public",
      },
    ],
    relatedProjectSlugs: ["solid-2"],
  },
  {
    id: "oss-solid-socket",
    category: "open-source",
    metric: "Author",
    label: "solid-socket",
    description:
      "Created an open-source SolidJS library for server-side reactive state and WebSocket-backed synchronization.",
    context: "Reactive real-time state for Solid applications.",
    sources: [
      {
        label: "solid-socket source",
        href: "https://github.com/devagrawal09/solid-socket",
        sourceType: "public",
      },
    ],
    relatedProjectSlugs: ["solid-socket"],
  },
  {
    id: "oss-solid-events",
    category: "open-source",
    metric: "Author",
    label: "solid-events",
    description:
      "Created event-driven primitives for SolidJS that help model reactive UI flows with clearer boundaries and less incidental state.",
    context: "Composable event primitives for Solid.",
    sources: [
      {
        label: "solid-events source",
        href: "https://github.com/devagrawal09/solid-events",
        sourceType: "public",
      },
    ],
    relatedProjectSlugs: ["solid-events"],
  },
  {
    id: "award-solidhack",
    category: "award",
    metric: "2x",
    label: "SolidHack winner",
    description:
      "Won SolidHack 2024's Best SolidStart App category with Solid Socket and claimed the Solid Primitive challenge with solid-events.",
    context: "Public Solid ecosystem hackathon presented by the Solid team.",
    sources: [
      {
        label: "SolidHack categories",
        href: "https://hack.solidjs.com/categories-challenges",
        sourceType: "public",
      },
      {
        label: "SolidHack overview",
        href: "https://hack.solidjs.com/",
        sourceType: "public",
      },
    ],
    featured: true,
    relatedProjectSlugs: ["solid-socket", "solid-events"],
  },
  {
    id: "research-acm",
    category: "research",
    metric: "ACM",
    label: "Peer-reviewed publication",
    description:
      "Primary author of an ACM GROUP '20 Companion paper on smart-home security, co-monitoring, and contextual access control for IoT devices.",
    context: "Smart-home security research cited by later work in the field.",
    sources: [
      {
        label: "ACM DOI",
        href: "https://doi.org/10.1145/3323994.3369883",
        sourceType: "public",
      },
      {
        label: "EUSSET record",
        href: "https://dl.eusset.eu/items/2dddc49c-d4eb-488a-8f4f-2fb07f4fa1af",
        sourceType: "public",
      },
    ],
    featured: true,
  },
  {
    id: "project-osdp",
    category: "project-impact",
    metric: "Civic",
    label: "Ohio Sentencing Data Platform",
    description:
      "Built configurable sentencing-data workflows for Ohio court users, including branching legal forms, validation, structured data collection, and exportable records.",
    context: "Civic technology collaboration with Ohio court stakeholders.",
    sources: [
      {
        label: "Court News Ohio coverage",
        href: "https://courtnewsohio.gov/happening/2021/sentencingDataPlatform_062521.asp",
        sourceType: "public",
      },
    ],
    relatedProjectSlugs: ["osdp"],
  },
  {
    id: "project-hackathon-suite",
    category: "project-impact",
    metric: "9 parts",
    label: "Hackathon infrastructure",
    description:
      "Led a multi-application platform for student hackathons covering registration, check-in, team matching, judging, scoring, analytics, and Discord automation.",
    context: "Event operations software for UC hackathon communities.",
    sources: [
      {
        label: "RevolutionUC GitHub",
        href: "https://github.com/revolutionUC/",
        sourceType: "public",
      },
    ],
    relatedProjectSlugs: ["hackathon-suite"],
  },
  {
    id: "project-scrumgpt",
    category: "project-impact",
    metric: "AI",
    label: "ScrumGPT",
    description:
      "Designed an AI project-management assistant for meeting summaries, structured follow-up, project-board updates, calendar and email drafting, and human approval workflows.",
    context: "Public-safe framing of internal AI productivity work.",
    sources: [{ label: "Project details require approval", sourceType: "needs-verification" }],
    relatedProjectSlugs: ["scrumgpt"],
  },
  {
    id: "project-caresource",
    category: "project-impact",
    metric: "Health",
    label: "Healthcare member experience",
    description:
      "Worked on member-facing healthcare application flows including dashboards, help-center surfaces, self-service UX, reliability, and performance improvements.",
    context: "Regulated-industry product engineering, described at a safe abstraction level.",
    sources: [{ label: "Project details require approval", sourceType: "needs-verification" }],
    relatedProjectSlugs: ["caresource"],
  },
  {
    id: "project-qbridge",
    category: "project-impact",
    metric: "Quantum",
    label: "AI quantum research tooling",
    description:
      "Built AI-assisted research tooling that helps technical users reason about quantum workflows, experiments, execution status, and result interpretation.",
    context: "Private client work described without unreleased customer details.",
    sources: [{ label: "Project details require approval", sourceType: "needs-verification" }],
    relatedProjectSlugs: ["qbridge", "qai-hub"],
  },
];

export const FEATURED_PROOF = PROOF_ITEMS.filter((item) => item.featured);
export const SPEAKING_PROOF = PROOF_ITEMS.filter((item) => item.category === "speaking");
export const OSS_PROOF = PROOF_ITEMS.filter((item) => item.category === "open-source");
export const RESEARCH_PROOF = PROOF_ITEMS.filter((item) => item.category === "research");
export const PROJECT_PROOF = PROOF_ITEMS.filter((item) => item.category === "project-impact");

export function getProofByIds(ids: readonly string[] | undefined) {
  if (!ids?.length) return [];
  const wanted = new Set(ids);
  return PROOF_ITEMS.filter((item) => wanted.has(item.id));
}
