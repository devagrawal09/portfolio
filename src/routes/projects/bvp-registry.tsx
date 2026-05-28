import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "bvp-registry",
  title: "BVP Registry",
  description:
    "Registry and reporting workflow for structured submissions, review states, and searchable records.",
  tech: ["JavaScript", "Registry workflows", "Reporting", "Search"],
  links: [],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function bvpRegistryProjectPage() {
  return <ProjectPage project={project} />;
}
