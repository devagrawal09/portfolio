import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "specter",
  title: "Specter",
  description:
    "Specter is a TypeScript framework for vertically sliced, event-sourced applications. Its Effect-native runtime coordinates Commands, Queries, and Reactions over declared schemas, durable events, and project-owned transport. Portable Slice specifications pair feature contracts with concrete scenarios, then export JSON that TypeScript and Go implementations can share. The workspace includes SQLite and Postgres adapters, an initializer, observability tooling, and Todo, booking, and workspace reference apps. Near-term work explores a visual scenario editor, stronger cross-language runtimes, and an opt-in agent-assisted preview pipeline that produces a draft PR and verification evidence—not automatic production apps.",
  tech: [
    "TypeScript",
    "Solid",
    "Effect",
    "Effect RPC",
    "Drizzle",
    "SQLite",
    "Vite",
    "Event Sourcing",
  ],
  links: [
    {
      label: "Website →",
      href: "https://devagrawal09.github.io/specter/",
      primary: true,
    },
    {
      label: "Source →",
      href: "https://github.com/devagrawal09/specter",
    },
  ],
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function specterProjectPage() {
  return <ProjectPage project={project} />;
}
