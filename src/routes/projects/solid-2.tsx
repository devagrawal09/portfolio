import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "solid-2",
  title: "Solid 2.0",
  description:
    "Secondary contributor work helping shape the API and implementation of Solid's next-generation async reactivity, immutable fine-grained stores, scheduling, and developer experience.",
  tech: ["SolidJS", "TypeScript", "Async reactivity", "Framework internals"],
  links: [
    {
      label: "SolidJS",
      href: "https://github.com/solidjs/solid",
      primary: true,
    },
  ],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function solid2ProjectPage() {
  return <ProjectPage project={project} />;
}
