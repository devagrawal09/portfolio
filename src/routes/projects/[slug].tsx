import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import { A, useParams } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { analytics } from "~/config/analytics";
import { PageMeta } from "~/components/PageMeta";
import { colors, layout, radius, space, text } from "~/styles/tokens";
import { PROJECTS, type FeaturedProject } from "~/data/projects";
import type { PlaceholderProject } from "~/data/project-placeholders";
import { placeholderProjects } from "~/data/project-placeholders";

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, JSX.CSSProperties> = {
  // ── Page scaffold ──
  page: {
    "max-width": layout.contentWidth,
    margin: "0 auto",
    padding: `${space[16]} ${space[8]} ${space[16]}`,
  },

  // ── Header ──
  headerTop: {
    display: "flex",
    "align-items": "flex-start",
    "justify-content": "space-between",
    gap: space[4],
    "flex-wrap": "wrap",
    "margin-bottom": space[2],
  },
  title: {
    "font-size": text.pageHeading,
    "font-weight": "700",
    color: colors.textBright,
    "letter-spacing": "-0.03em",
    "line-height": "1.2",
  },
  tagline: {
    "font-size": text.md,
    color: colors.text,
    "line-height": "1.7",
    "font-weight": "400",
    "max-width": layout.contentNarrow,
    "margin-bottom": space[10],
  },

  // ── Tech tags ──
  tagSection: {
    "padding-top": space[8],
    "border-top": `1px solid ${colors.border}`,
    "margin-bottom": space[8],
  },
  tagSectionLabel: {
    "font-size": text.xs,
    "font-weight": "600",
    "letter-spacing": "0.1em",
    "text-transform": "uppercase",
    color: colors.textFaint,
    "margin-bottom": space[4],
  },
  linksSectionLabel: {
    width: "100%",
    "font-size": text.xs,
    "font-weight": "600",
    "letter-spacing": "0.1em",
    "text-transform": "uppercase",
    color: colors.textFaint,
  },
  tagRow: {
    display: "flex",
    "flex-wrap": "wrap",
    gap: space[2],
  },
  tag: {
    "font-size": "0.7rem",
    "font-weight": "600",
    "letter-spacing": "0.06em",
    "text-transform": "uppercase",
    color: colors.textFaint,
    "background-color": colors.bgSubtle,
    border: `1px solid ${colors.border}`,
    "border-radius": radius.sm,
    padding: "0.15rem 0.5rem",
  },

  // ── Footer links ──
  linksSection: {
    "padding-top": space[8],
    "border-top": `1px solid ${colors.border}`,
    display: "flex",
    gap: space[5],
    "flex-wrap": "wrap",
    "align-items": "center",
  },
  linkPrimary: {
    display: "inline-block",
    padding: "0.5rem 1.25rem",
    "background-color": colors.accent,
    color: colors.bg,
    "border-radius": radius.md,
    "font-weight": "600",
    "font-size": text.sm,
  },
  linkSecondary: {
    "font-size": text.sm,
    color: colors.textMuted,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

type ProjectLink = {
  label: string;
  href: string;
  primary?: boolean;
};

function linksForFeaturedProject(project: FeaturedProject): ProjectLink[] {
  const links = [
    project.url
      ? { label: project.urlLabel ?? "View project ↗", href: project.url, primary: true }
      : undefined,
    project.repoUrl && project.repoUrl !== project.url
      ? { label: "Source →", href: project.repoUrl }
      : undefined,
    ...(project.publicSources?.map((source) => ({ label: source.label, href: source.href })) ?? []),
  ].filter((link): link is ProjectLink => Boolean(link));

  return links.filter(
    (link, index) => links.findIndex((candidate) => candidate.href === link.href) === index
  );
}

function linksForPlaceholderProject(project: PlaceholderProject): ProjectLink[] {
  return project.links?.map((link, index) => ({ ...link, primary: index === 0 })) ?? [];
}

// ─── Route ────────────────────────────────────────────────────────────────────

export default function CaseStudyPage() {
  const params = useParams<{ slug: string }>();
  const project = () => PROJECTS.find((p) => p.slug === params.slug);
  const placeholder = () => placeholderProjects.find((p) => p.slug === params.slug);

  const trackExternal = (label: string) => () =>
    analytics.trackEvent("featured_work_click", {
      slug: params.slug,
      location: label,
    });

  return (
    <Show
      when={project()}
      fallback={
        <Show
          when={placeholder()}
          fallback={
            <>
              <HttpStatusCode code={404} />
              <PageMeta
                title="Case study not found"
                description="That project doesn't exist."
                noIndex
              />
              <div class="sketch-page sketch-page-narrow">
                <p class="sketch-eyebrow">Work</p>
                <h1 class="sketch-heading">Project not found.</h1>
                <p class="sketch-body">
                  That case study URL doesn't match any project in the portfolio.
                </p>
                <A href="/projects" class="sketch-button">
                  All projects
                </A>
              </div>
            </>
          }
        >
          {(p) => (
            <>
              <PageMeta
                title={`${p().title} — Project`}
                description={p().summary}
                ogImage="/og/work.svg"
                noIndex
              />
              <div style={s.page}>
                <div style={s.headerTop}>
                  <h1 style={s.title}>{p().title}</h1>
                </div>
                <p style={s.tagline}>{p().summary}</p>

                <div style={s.tagSection}>
                  <p style={s.tagSectionLabel}>Tech stack</p>
                  <div style={s.tagRow}>
                    <For each={p().tech}>{(tag) => <span style={s.tag}>{tag}</span>}</For>
                  </div>
                </div>

                <Show when={linksForPlaceholderProject(p()).length}>
                  <div style={s.linksSection}>
                    <p style={s.linksSectionLabel}>Links</p>
                    <For each={linksForPlaceholderProject(p())}>
                      {(link) => (
                        <a
                          href={link.href}
                          style={link.primary ? s.linkPrimary : s.linkSecondary}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={trackExternal("project_link")}
                        >
                          {link.label}
                        </a>
                      )}
                    </For>
                  </div>
                </Show>
              </div>
            </>
          )}
        </Show>
      }
    >
      {(p) => (
        <>
          <PageMeta
            title={`${p().title} — Project`}
            description={p().description}
            ogImage="/og/work.svg"
          />

          <div style={s.page}>
            <div style={s.headerTop}>
              <h1 style={s.title}>{p().title}</h1>
            </div>
            <p style={s.tagline}>{p().description}</p>

            <div style={s.tagSection}>
              <p style={s.tagSectionLabel}>Tech stack</p>
              <div style={s.tagRow}>
                <For each={p().tech}>{(tag) => <span style={s.tag}>{tag}</span>}</For>
              </div>
            </div>

            <Show when={linksForFeaturedProject(p()).length}>
              <div style={s.linksSection}>
                <p style={s.linksSectionLabel}>Links</p>
                <For each={linksForFeaturedProject(p())}>
                  {(link) => (
                    <a
                      href={link.href}
                      style={link.primary ? s.linkPrimary : s.linkSecondary}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackExternal("project_link")}
                    >
                      {link.label}
                    </a>
                  )}
                </For>
              </div>
            </Show>
          </div>
        </>
      )}
    </Show>
  );
}
