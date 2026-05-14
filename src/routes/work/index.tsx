import { For } from "solid-js";
import { A } from "@solidjs/router";
import { PageMeta } from "~/components/PageMeta";
import { PROJECTS } from "~/data/projects";
import { placeholderProjects } from "~/data/project-placeholders";

type ProjectTile = {
  title: string;
  href?: string;
};

const allProjectTiles = [
  ...PROJECTS.filter((project) => project.caseStudyPath).map((project) => ({
    slug: project.slug,
    title: project.title,
    href: project.caseStudyPath,
  })),
  ...placeholderProjects.map((project) => ({
    slug: project.slug,
    title: project.title,
    href: `/work/${project.slug}`,
  })),
];

const projectOrder: readonly { slug: string; title?: string }[] = [
  { slug: "powerchat" },
  { slug: "solid-2" },
  { slug: "solid-socket", title: "Solid Socket" },
  { slug: "solid-events" },
  { slug: "qbridge", title: "QBridg" },
  { slug: "qai-hub" },
  { slug: "dawadaddy" },
  { slug: "scrumgpt" },
  { slug: "caresource" },
  { slug: "momentum-devcon", title: "Momentum App" },
  { slug: "protocheck" },
  { slug: "devtranet" },
  { slug: "osdp" },
  { slug: "hackathon-suite" },
  { slug: "professional-accelerator" },
  { slug: "oyas" },
  { slug: "torpedoshoes" },
  { slug: "thingzone" },
  { slug: "healthy-loved-ones" },
  { slug: "wedding-planner" },
  { slug: "bvp-registry" },
];

const projectTiles: ProjectTile[] = projectOrder.flatMap((orderedProject) => {
  const project = allProjectTiles.find((tile) => tile.slug === orderedProject.slug);

  if (!project) {
    return [];
  }

  return [
    {
      title: orderedProject.title ?? project.title,
      href: project.href,
    },
  ];
});

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
