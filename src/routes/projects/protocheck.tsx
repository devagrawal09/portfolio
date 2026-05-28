import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "protocheck",
  title: "ProtoCheck",
  description:
    "Prototype validation tooling for checking assumptions before investing in heavier product implementation.",
  tech: ["TypeScript", "Product validation", "Experiment tracking"],
  links: [],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function protocheckProjectPage() {
  return <ProjectPage project={project} />;
}
