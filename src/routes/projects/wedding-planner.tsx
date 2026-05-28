import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "wedding-planner",
  title: "Wedding Planner",
  description:
    "Planning tool concept for tasks, vendor notes, dates, and decisions across a long-running event project.",
  tech: ["JavaScript", "Planning workflows", "Task management"],
  links: [],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function weddingPlannerProjectPage() {
  return <ProjectPage project={project} />;
}
