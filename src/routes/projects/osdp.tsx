import { ProjectPage } from "~/components/ProjectPage";

const project = {
  slug: "osdp",
  title: "Ohio Sentencing Data Platform",
  description:
    "A full-stack JavaScript platform for collecting and analyzing criminal sentencing data from courts across Ohio. Built in direct collaboration with the Ohio Supreme Court and 10+ counties. Serves public transparency, practitioner decision-support, and research use cases.",
  tech: ["Node.js", "Express", "React", "PostgreSQL", "MongoDB", "Linux"],
  links: [
    {
      label: "Official coverage ↗",
      href: "https://courtnewsohio.gov/happening/2021/sentencingDataPlatform_062521.asp",
      primary: true,
    },
  ],
} as const;

export const projectSummary = {
  slug: project.slug,
  title: project.title,
} as const;

export default function osdpProjectPage() {
  return <ProjectPage project={project} />;
}
