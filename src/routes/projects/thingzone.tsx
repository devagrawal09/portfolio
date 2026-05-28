import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "thingzone",
  title: "ThingZone",
  description: "Inventory and object-management concept for tracking personal or team-owned items.",
  tech: ["JavaScript", "Inventory", "CRUD workflows", "Product design"],
  links: [],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function thingzoneProjectPage() {
  return <ProjectPage project={project} />;
}
