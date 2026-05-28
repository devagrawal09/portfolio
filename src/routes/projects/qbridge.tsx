import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "qbridge",
  title: "QBridg",
  description:
    "QBridg is an internal AI assistant that gives users conversational and tool-based access to TerraQuantum research assets, solution portfolios, and workflow demos. It exposes research analysis, dataset assessment, model reproduction, and vehicle-routing optimization through agent chat and direct tool APIs.",
  tech: ["Mastra", "MCP", "TypeScript", "LibSQL", "OpenAI", "Zod", "Nexus"],
  links: [],
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function qbridgeProjectPage() {
  return <ProjectPage project={project} />;
}
