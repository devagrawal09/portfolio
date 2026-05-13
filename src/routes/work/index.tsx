import { For } from "solid-js";
import { A } from "@solidjs/router";
import { PageMeta } from "~/components/PageMeta";
import { PROJECTS } from "~/data/projects";
import { placeholderProjects } from "~/data/project-placeholders";

type ProjectTile = {
  title: string;
  href?: string;
};

const projectTiles: ProjectTile[] = [
  ...PROJECTS.filter((project) => project.caseStudyPath).map((project) => ({
    title: project.title,
    href: project.caseStudyPath,
  })),
  ...placeholderProjects.map((project) => ({
    title: project.title,
    href: `/work/${project.slug}`,
  })),
];

export default function WorkPage() {
  return (
    <>
      <PageMeta
        title="Projects"
        description="Projects by Dev Agrawal across products, open source, civic technology, AI, and developer tools."
        ogImage="/og/work.svg"
      />

      <div class="sketch-page">
        <h1 class="sketch-heading">Projects</h1>
        <div class="project-grid">
          <For each={projectTiles}>
            {(project) =>
              project.href ? (
                <A href={project.href} class="sketch-card project-tile">
                  <span>{project.title}</span>
                </A>
              ) : (
                <div class="sketch-card project-tile">
                  <span>{project.title}</span>
                </div>
              )
            }
          </For>
        </div>
      </div>
    </>
  );
}
