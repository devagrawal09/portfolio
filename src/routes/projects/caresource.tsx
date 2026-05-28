import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "caresource",
  title: "CareSource",
  description:
    "Healthcare member experience work on the primary member interface for viewing profile details, benefits, documents, claims, and related self-service workflows.",
  tech: ["React", "TypeScript", "Healthcare UX", "Member self-service"],
  links: [],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function caresourceProjectPage() {
  return <ProjectPage project={project} />;
}
