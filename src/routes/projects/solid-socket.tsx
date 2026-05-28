import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "solid-socket",
  title: "Solid Socket",
  description:
    'An open source SolidStart extension that adds a `"use socket"` directive, turning exported functions into WebSocket-backed RPC and subscriptions. The demo is a collaborative TodoMVC app with username login, invite-based sharing, optimistic updates, presence indicators, and cookie-based access control.',
  tech: ["SolidJS", "SolidStart", "WebSockets", "Vinxi", "TypeScript", "unstorage"],
  links: [
    {
      label: "Live demo ↗",
      href: "https://solid-socket-production.up.railway.app/",
      primary: true,
    },
    {
      label: "Source →",
      href: "https://github.com/devagrawal09/solid-socket",
    },
    {
      label: "SolidHack winner listing",
      href: "https://hack.solidjs.com/categories-challenges",
    },
  ],
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function solidSocketProjectPage() {
  return <ProjectPage project={project} />;
}
