import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "healthy-loved-ones",
  title: "HealthyLovedOnes",
  description:
    "Family health coordination concept for sharing lightweight updates and recurring care tasks.",
  tech: ["JavaScript", "Healthcare coordination", "Task workflows"],
  links: [],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function healthyLovedOnesProjectPage() {
  return <ProjectPage project={project} />;
}
