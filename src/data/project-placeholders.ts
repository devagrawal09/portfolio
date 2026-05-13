export interface PlaceholderProject {
  title: string;
  slug: string;
  summary: string;
  proofIds?: readonly string[];
}

export const placeholderProjects: readonly PlaceholderProject[] = [
  {
    title: "PowerChat",
    slug: "powerchat",
    summary:
      "AI chat prototype exploring product support, workflow assistance, and internal knowledge access.",
  },
  {
    title: "Solid 2.0",
    slug: "solid-2",
    summary:
      "Framework research and ecosystem work around the next generation of Solid's primitives and developer experience.",
    proofIds: ["oss-solid-core", "oss-tanstack-start"],
  },
  {
    title: "Solid Events",
    slug: "solid-events",
    summary:
      "Event-driven helpers for modeling reactive UI flows with clearer boundaries and less incidental state.",
    proofIds: ["oss-solid-events", "award-solidhack", "oss-solid-core"],
  },
  {
    title: "QBridge",
    slug: "qbridge",
    summary:
      "Research tooling that connected analysts, quantum workflows, and experiment metadata in one product surface.",
    proofIds: ["project-qbridge"],
  },
  {
    title: "QAI Hub",
    slug: "qai-hub",
    summary:
      "Machine-learning platform work for teams running experiments, reviewing output, and iterating on models.",
  },
  {
    title: "DawaDaddy",
    slug: "dawadaddy",
    summary:
      "Medication and health workflow concept focused on reminders, household coordination, and simple record keeping.",
  },
  {
    title: "ScrumGPT",
    slug: "scrumgpt",
    summary:
      "AI project-management assistant for meeting summaries, structured follow-up, project-board updates, and human approval workflows.",
    proofIds: ["project-scrumgpt"],
  },
  {
    title: "CareSource",
    slug: "caresource",
    summary:
      "Healthcare member application work focused on reliability, accessibility, and clear self-service flows.",
    proofIds: ["project-caresource"],
  },
  {
    title: "ProtoCheck",
    slug: "protocheck",
    summary:
      "Prototype validation tooling for checking assumptions before investing in heavier product implementation.",
  },
  {
    title: "Devtranet",
    slug: "devtranet",
    summary: "Internal developer portal concept for docs, team updates, and workflow shortcuts.",
  },
  {
    title: "Professional Accelerator",
    slug: "professional-accelerator",
    summary:
      "Career-development product work around structured learning, mentorship, and measurable growth plans.",
  },
  {
    title: "OYAS",
    slug: "oyas",
    summary:
      "Civic and community software work with a focus on practical data collection and simple operational workflows.",
  },
  {
    title: "TorpedoShoes",
    slug: "torpedoshoes",
    summary: "E-commerce and brand experience exploration for a focused product catalog.",
  },
  {
    title: "ThingZone",
    slug: "thingzone",
    summary: "Inventory and object-management concept for tracking personal or team-owned items.",
  },
  {
    title: "HealthyLovedOnes",
    slug: "healthy-loved-ones",
    summary:
      "Family health coordination concept for sharing lightweight updates and recurring care tasks.",
  },
  {
    title: "Wedding Planner",
    slug: "wedding-planner",
    summary:
      "Planning tool concept for tasks, vendor notes, dates, and decisions across a long-running event project.",
  },
  {
    title: "BVP Registry",
    slug: "bvp-registry",
    summary:
      "Registry and reporting workflow for structured submissions, review states, and searchable records.",
  },
];
