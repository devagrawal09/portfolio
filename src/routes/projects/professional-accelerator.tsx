import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "professional-accelerator",
  title: "Professional Accelerator",
  description:
    "Career-development product work around structured learning, mentorship, and measurable growth plans.",
  tech: ["React", "TypeScript", "Learning workflows", "Mentorship"],
  links: [],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function professionalAcceleratorProjectPage() {
  return <ProjectPage project={project} />;
}
