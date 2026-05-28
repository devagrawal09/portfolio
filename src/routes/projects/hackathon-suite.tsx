import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "hackathon-suite",
  title: "Hackathon Suite",
  description:
    "A suite of applications and services supporting UC's largest student hackathons across four years and multiple virtual and in-person formats. Grew from a small tool into a platform covering the full event lifecycle under technical leadership.",
  tech: ["NestJS", "Postgres", "React", "Angular", "AWS", "Discord.js", "Chart.js"],
  links: [
    {
      label: "Source →",
      href: "https://github.com/revolutionUC/",
    },
  ],
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function hackathonSuiteProjectPage() {
  return <ProjectPage project={project} />;
}
