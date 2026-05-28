import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "torpedoshoes",
  title: "TorpedoShoes",
  description: "E-commerce and brand experience exploration for a focused product catalog.",
  tech: ["JavaScript", "E-commerce", "Product catalog", "Brand UX"],
  links: [],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function torpedoshoesProjectPage() {
  return <ProjectPage project={project} />;
}
