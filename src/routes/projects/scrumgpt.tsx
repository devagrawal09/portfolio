import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "scrumgpt",
  title: "ScrumGPT",
  description:
    "AI project-management assistant for meeting summaries, structured follow-up, project-board updates, and human approval workflows.",
  tech: ["LLMs", "TypeScript", "Workflow automation", "Project management"],
  links: [],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function scrumgptProjectPage() {
  return <ProjectPage project={project} />;
}
