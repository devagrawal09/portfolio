import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "solid-events",
  title: "Solid Events",
  description:
    "A published SolidJS library for modeling user events, async workflows, optimistic UI, and fine-grained mutations as explicit event pipelines. It fills the event-composition gap between pull-based Solid signals and heavier observable systems like RxJS.",
  tech: ["SolidJS", "TypeScript", "RxJS", "Solid Primitives", "Vitest"],
  links: [
    {
      label: "npm package ↗",
      href: "https://www.npmjs.com/package/solid-events",
      primary: true,
    },
    {
      label: "Source →",
      href: "https://github.com/devagrawal09/solid-events",
    },
    {
      label: "Strello demo implementation",
      href: "https://github.com/devagrawal09/strello/pull/1/files",
    },
  ],
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function solidEventsProjectPage() {
  return <ProjectPage project={project} />;
}
