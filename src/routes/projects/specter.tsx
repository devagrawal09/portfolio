import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "specter",
  title: "Specter",
  description:
    "Framework for building specifications that compile, execute and scaffold applications around vertical features. The workspace includes the `@specter-ts/core` runtime, the `create-specter` project initializer, and a reference app that proves the framework API.",
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
