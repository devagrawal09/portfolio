import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "powerchat",
  title: "PowerChat",
  description:
    "Public-source prototype for a multiplayer, multi-agent collaboration app where people can share channels, context, and agent workspaces instead of using isolated one-player AI chats.",
  tech: ["SolidStart", "TypeScript", "Multi-agent UX", "Realtime collaboration"],
  links: [
    {
      label: "Source",
      href: "https://github.com/devagrawal09/powerchat",
      primary: true,
    },
  ],
  noIndex: true,
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function powerchatProjectPage() {
  return <ProjectPage project={project} />;
}
