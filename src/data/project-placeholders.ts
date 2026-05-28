export interface PlaceholderProject {
  title: string;
  slug: string;
  summary: string;
  tech: readonly string[];
  links?: readonly {
    label: string;
    href: string;
  }[];
  proofIds?: readonly string[];
}

export const placeholderProjects: readonly PlaceholderProject[] = [
  {
    title: "PowerChat",
    slug: "powerchat",
    summary:
      "Public-source prototype for a multiplayer, multi-agent collaboration app where people can share channels, context, and agent workspaces instead of using isolated one-player AI chats.",
    tech: ["SolidStart", "TypeScript", "Multi-agent UX", "Realtime collaboration"],
    links: [{ label: "Source", href: "https://github.com/devagrawal09/powerchat" }],
    proofIds: ["project-powerchat"],
  },
  {
    title: "Solid 2.0",
    slug: "solid-2",
    summary:
      "Secondary contributor work helping shape the API and implementation of Solid's next-generation async reactivity, immutable fine-grained stores, scheduling, and developer experience.",
    tech: ["SolidJS", "TypeScript", "Async reactivity", "Framework internals"],
    links: [{ label: "SolidJS", href: "https://github.com/solidjs/solid" }],
    proofIds: ["oss-solid-core", "oss-tanstack-start"],
  },
  {
    title: "DawaDaddy",
    slug: "dawadaddy",
    summary:
      "Medication and health workflow concept focused on reminders, household coordination, and simple record keeping.",
    tech: ["React", "TypeScript", "Product design", "Healthcare workflows"],
  },
  {
    title: "ScrumGPT",
    slug: "scrumgpt",
    summary:
      "AI project-management assistant for meeting summaries, structured follow-up, project-board updates, and human approval workflows.",
    tech: ["LLMs", "TypeScript", "Workflow automation", "Project management"],
    proofIds: ["project-scrumgpt"],
  },
  {
    title: "CareSource",
    slug: "caresource",
    summary:
      "Healthcare member experience work on the primary member interface for viewing profile details, benefits, documents, claims, and related self-service workflows.",
    tech: ["React", "TypeScript", "Healthcare UX", "Member self-service"],
    proofIds: ["project-caresource"],
  },
  {
    title: "ProtoCheck",
    slug: "protocheck",
    summary:
      "Prototype validation tooling for checking assumptions before investing in heavier product implementation.",
    tech: ["TypeScript", "Product validation", "Experiment tracking"],
  },
  {
    title: "Devtranet",
    slug: "devtranet",
    summary: "Internal developer portal concept for docs, team updates, and workflow shortcuts.",
    tech: ["React", "TypeScript", "Internal tooling", "Documentation"],
  },
  {
    title: "Professional Accelerator",
    slug: "professional-accelerator",
    summary:
      "Career-development product work around structured learning, mentorship, and measurable growth plans.",
    tech: ["React", "TypeScript", "Learning workflows", "Mentorship"],
  },
  {
    title: "OYAS",
    slug: "oyas",
    summary:
      "Civic and community software work with a focus on practical data collection and simple operational workflows.",
    tech: ["JavaScript", "Civic tech", "Data collection", "Operations"],
  },
  {
    title: "TorpedoShoes",
    slug: "torpedoshoes",
    summary: "E-commerce and brand experience exploration for a focused product catalog.",
    tech: ["JavaScript", "E-commerce", "Product catalog", "Brand UX"],
  },
  {
    title: "ThingZone",
    slug: "thingzone",
    summary: "Inventory and object-management concept for tracking personal or team-owned items.",
    tech: ["JavaScript", "Inventory", "CRUD workflows", "Product design"],
  },
  {
    title: "HealthyLovedOnes",
    slug: "healthy-loved-ones",
    summary:
      "Family health coordination concept for sharing lightweight updates and recurring care tasks.",
    tech: ["JavaScript", "Healthcare coordination", "Task workflows"],
  },
  {
    title: "Wedding Planner",
    slug: "wedding-planner",
    summary:
      "Planning tool concept for tasks, vendor notes, dates, and decisions across a long-running event project.",
    tech: ["JavaScript", "Planning workflows", "Task management"],
  },
  {
    title: "BVP Registry",
    slug: "bvp-registry",
    summary:
      "Registry and reporting workflow for structured submissions, review states, and searchable records.",
    tech: ["JavaScript", "Registry workflows", "Reporting", "Search"],
  },
];
