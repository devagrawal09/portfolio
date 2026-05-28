import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import { analytics } from "~/config/analytics";
import { PageMeta } from "~/components/PageMeta";
import { colors, layout, radius, space, text } from "~/styles/tokens";

export type ProjectPageData = {
  slug: string;
  title: string;
  description: string;
  tech: readonly string[];
  links?: readonly { label: string; href: string; primary?: boolean }[];
  noIndex?: boolean;
};

const s: Record<string, JSX.CSSProperties> = {
  page: {
    "max-width": layout.contentWidth,
    margin: "0 auto",
    padding: `${space[16]} ${space[8]} ${space[16]}`,
  },
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
  tagRow: { display: "flex", "flex-wrap": "wrap", gap: space[2] },
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
  linkSecondary: { "font-size": text.sm, color: colors.textMuted },
};

export function ProjectPage(props: { project: ProjectPageData }) {
  const trackExternal = () =>
    analytics.trackEvent("featured_work_click", {
      slug: props.project.slug,
      location: "project_link",
    });

  return (
    <>
      <PageMeta
        title={`${props.project.title} — Project`}
        description={props.project.description}
        ogImage="/og/work.svg"
        noIndex={props.project.noIndex}
      />
      <div style={s.page}>
        <div style={s.headerTop}>
          <h1 style={s.title}>{props.project.title}</h1>
        </div>
        <p style={s.tagline}>{props.project.description}</p>
        <div style={s.tagSection}>
          <p style={s.tagSectionLabel}>Tech stack</p>
          <div style={s.tagRow}>
            <For each={props.project.tech}>{(tag) => <span style={s.tag}>{tag}</span>}</For>
          </div>
        </div>
        <Show when={props.project.links?.length}>
          <div style={s.linksSection}>
            <p style={s.linksSectionLabel}>Links</p>
            <For each={props.project.links}>
              {(link) => (
                <a
                  href={link.href}
                  style={link.primary ? s.linkPrimary : s.linkSecondary}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackExternal}
                >
                  {link.label}
                </a>
              )}
            </For>
          </div>
        </Show>
      </div>
    </>
  );
}
