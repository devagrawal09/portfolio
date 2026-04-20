import { For } from "solid-js";
import type { JSX } from "solid-js";
import { A } from "@solidjs/router";
import { analytics } from "~/config/analytics";
import { PageMeta } from "~/components/PageMeta";
import { pageStyles } from "~/styles/recipes";
import { colors, layout, radius, space, text } from "~/styles/tokens";
import { PROJECTS, type FeaturedProject, type ProjectKind } from "~/data/projects";

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, JSX.CSSProperties> = {
  // ── Page scaffold ──
  header: {
    "max-width": layout.contentWidth,
    margin: "0 auto",
    padding: `${space[16]} ${space[8]} ${space[10]}`,
  },

  // ── Project grid ──
  grid: {
    "max-width": layout.contentWidth,
    margin: "0 auto",
    padding: `0 ${space[8]} ${space[16]}`,
    display: "flex",
    "flex-direction": "column",
    gap: space[8],
  },

  // ── Project card ──
  card: {
    "background-color": colors.bgElevated,
    border: `1px solid ${colors.border}`,
    "border-radius": radius.lg,
    padding: space[8],
  },
  cardTop: {
    display: "flex",
    "align-items": "flex-start",
    "justify-content": "space-between",
    gap: space[4],
    "flex-wrap": "wrap",
    "margin-bottom": space[2],
  },
  cardTitle: {
    "font-size": text.lg,
    "font-weight": "700",
    color: colors.textBright,
    "letter-spacing": "-0.01em",
  },
  cardKindBadge: {
    "font-size": "0.7rem",
    "font-weight": "600",
    "letter-spacing": "0.08em",
    "text-transform": "uppercase",
    color: colors.accent,
    "background-color": colors.accentDim,
    border: `1px solid ${colors.accentBorder}`,
    "border-radius": radius.sm,
    padding: "0.2rem 0.55rem",
    "flex-shrink": "0",
    "align-self": "flex-start",
  },
  cardMeta: {
    "font-size": text.xs,
    color: colors.textFaint,
    "margin-bottom": space[4],
  },
  cardTagline: {
    "font-size": text.md,
    color: colors.text,
    "line-height": "1.65",
    "margin-bottom": space[5],
    "font-weight": "500",
  },

  // ── Detail rows ──
  detailBlock: {
    display: "flex",
    "flex-direction": "column",
    gap: space[4],
    "padding-top": space[5],
    "border-top": `1px solid ${colors.border}`,
    "margin-bottom": space[5],
  },
  detailRow: {
    display: "flex",
    gap: space[4],
    "align-items": "flex-start",
  },
  detailLabel: {
    "font-size": text.xs,
    "font-weight": "600",
    "letter-spacing": "0.1em",
    "text-transform": "uppercase",
    color: colors.textFaint,
    "min-width": "90px",
    "padding-top": "0.15em",
    "flex-shrink": "0",
  },
  detailValue: {
    "font-size": text.sm,
    color: colors.textMuted,
    "line-height": "1.65",
  },
  detailValueOutcome: {
    "font-size": text.sm,
    color: colors.text,
    "line-height": "1.65",
  },

  // ── Tech tags ──
  tagRow: {
    display: "flex",
    "flex-wrap": "wrap",
    gap: space[2],
    "margin-bottom": space[5],
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

  // ── Card links ──
  linkRow: {
    display: "flex",
    gap: space[4],
    "flex-wrap": "wrap",
    "align-items": "center",
  },
  linkCaseStudy: {
    "font-size": text.sm,
    color: colors.accent,
    "font-weight": "600",
  },
  linkPrimary: {
    "font-size": text.sm,
    color: colors.textMuted,
  },
  linkSecondary: {
    "font-size": text.sm,
    color: colors.textFaint,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const KIND_LABELS: Record<ProjectKind, string> = {
  product: "Product",
  oss: "Open Source",
  civic: "Civic Tech",
  devrel: "DevRel",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProjectCard(props: { project: FeaturedProject }) {
  const trackExternal = () =>
    analytics.trackEvent("featured_work_click", {
      slug: props.project.slug,
      location: "work_page",
    });
  const trackCaseStudy = () =>
    analytics.trackEvent("case_study_click", {
      slug: props.project.slug,
      location: "work_page",
    });

  return (
    <article style={s.card}>
      <div style={s.cardTop}>
        <span style={s.cardTitle}>{props.project.title}</span>
        <span style={s.cardKindBadge}>{KIND_LABELS[props.project.kind]}</span>
      </div>
      <div style={s.cardMeta}>
        {props.project.role} · {props.project.period}
      </div>

      <p style={s.cardTagline}>{props.project.tagline}</p>

      <div style={s.detailBlock}>
        <div style={s.detailRow}>
          <span style={s.detailLabel}>What</span>
          <span style={s.detailValue}>{props.project.description}</span>
        </div>
        <div style={s.detailRow}>
          <span style={s.detailLabel}>Architecture</span>
          <span style={s.detailValue}>{props.project.architecture}</span>
        </div>
        <div style={s.detailRow}>
          <span style={s.detailLabel}>Outcome</span>
          <span style={s.detailValueOutcome}>{props.project.outcome}</span>
        </div>
      </div>

      <div style={s.tagRow}>
        <For each={props.project.tech}>{(tag) => <span style={s.tag}>{tag}</span>}</For>
      </div>

      <div style={s.linkRow}>
        {props.project.caseStudyPath && (
          <A href={props.project.caseStudyPath} style={s.linkCaseStudy} onClick={trackCaseStudy}>
            Case study →
          </A>
        )}
        {props.project.url && (
          <a
            href={props.project.url}
            style={s.linkPrimary}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackExternal}
          >
            View project ↗
          </a>
        )}
        {props.project.repoUrl && props.project.repoUrl !== props.project.url && (
          <a
            href={props.project.repoUrl}
            style={s.linkSecondary}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackExternal}
          >
            Source →
          </a>
        )}
      </div>
    </article>
  );
}

// ─── Route ────────────────────────────────────────────────────────────────────

export default function WorkPage() {
  return (
    <>
      <PageMeta
        title="Work"
        description="Selected projects, open source work, and technical case studies from Dev Agrawal — fullstack engineer, DevRel, and Solid ecosystem contributor."
        ogImage="/og/work.svg"
      />

      <div style={s.header}>
        <p style={pageStyles.eyebrow}>Projects</p>
        <h1 style={pageStyles.pageHeading}>Work</h1>
        <p style={pageStyles.bodyText}>
          A curated selection of the work I'm most proud of — spanning civic tech, open source
          libraries, conference tooling, and fullstack product work. Each entry includes the
          architecture decisions and concrete outcomes behind it.
        </p>
      </div>

      <div style={s.grid}>
        <For each={PROJECTS}>{(project) => <ProjectCard project={project} />}</For>
      </div>
    </>
  );
}
