import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "powerchat",
  title: "PowerChat",
  description:
    "PowerChat is an experimental, local-first chat app for exploring how people and AI agents can share a working channel. Built with SolidStart, PowerSync, Supabase Postgres, Drizzle, and Mastra, it provides real-time channels, offline-capable local SQLite writes and sync, and @mentions that trigger agents and persist streamed replies. Each channel also has a server-side workspace whose file metadata is synced into the UI, with raw text-file inspection. It is a prototype rather than a production service: anonymous cookie sessions and the current feature set exist to test collaborative agent workflows, not to offer a finished hosted product.",
  tech: ["SolidStart", "TypeScript", "PowerSync", "Supabase Postgres", "Mastra"],
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
