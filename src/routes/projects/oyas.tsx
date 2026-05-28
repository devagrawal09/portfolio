import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "oyas",
  title: "OYAS",
  description:
    "Civic and community software work with a focus on practical data collection and simple operational workflows.",
  tech: ["JavaScript", "Civic tech", "Data collection", "Operations"],
  links: [],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function oyasProjectPage() {
  return <ProjectPage project={project} />;
}
