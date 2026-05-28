import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "devtranet",
  title: "Devtranet",
  description: "Internal developer portal concept for docs, team updates, and workflow shortcuts.",
  tech: ["React", "TypeScript", "Internal tooling", "Documentation"],
  links: [],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function devtranetProjectPage() {
  return <ProjectPage project={project} />;
}
