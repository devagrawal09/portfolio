import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "momentum-devcon",
  title: "Momentum DevCon App",
  description:
    "A mobile-first web app for Momentum Developer Conference (500+ registrations). Attendees browse and bookmark sessions, provide real-time feedback, and connect with each other across the event. Built as a production SolidStart app proving out the framework in a live event context.",
  tech: ["SolidStart", "Drizzle", "Postgres", "Vercel", "Event Sourcing", "CQRS"],
  links: [],
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function momentumDevconProjectPage() {
  return <ProjectPage project={project} />;
}
