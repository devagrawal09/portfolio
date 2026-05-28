import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "dawadaddy",
  title: "DawaDaddy",
  description:
    "Medication and health workflow concept focused on reminders, household coordination, and simple record keeping.",
  tech: ["React", "TypeScript", "Product design", "Healthcare workflows"],
  links: [],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function dawadaddyProjectPage() {
  return <ProjectPage project={project} />;
}
