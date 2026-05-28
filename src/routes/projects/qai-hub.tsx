import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "qai-hub",
  title: "QAI Hub",
  description:
    "QAI Hub is a full-stack app for guiding users through AI/ML experiment setup: uploading datasets, detecting and editing schemas, generating cleaning recommendations, processing cleaned data, and configuring model-training runs. The product turns a multi-step ML workflow into explicit screens and recoverable state transitions.",
  tech: ["React Router", "React", "TypeScript", "KurrentDB", "Event Sourcing", "Tailwind"],
  links: [],
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function qaiHubProjectPage() {
  return <ProjectPage project={project} />;
}
