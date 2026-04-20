import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import { A, useParams } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { analytics } from "~/config/analytics";
import { PageMeta } from "~/components/PageMeta";
import { pageStyles } from "~/styles/recipes";
import { colors, layout, radius, space, text } from "~/styles/tokens";
import { PROJECTS, type ProjectKind } from "~/data/projects";

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, JSX.CSSProperties> = {
  // ── Page scaffold ──
  page: {
    "max-width": layout.contentWidth,
    margin: "0 auto",
    padding: `${space[16]} ${space[8]} ${space[16]}`,
  },

  // ── Back link ──
  backLink: {
    display: "inline-flex",
    "align-items": "center",
    gap: space[2],
    "font-size": text.sm,
    color: colors.textFaint,
    "margin-bottom": space[10],
    "text-decoration": "none",
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
  kindBadge: {
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
    "margin-top": "0.4rem",
  },
  meta: {
    "font-size": text.sm,
    color: colors.textFaint,
    "margin-bottom": space[5],
  },
  tagline: {
    "font-size": text.md,
    color: colors.text,
    "line-height": "1.7",
    "font-weight": "500",
    "max-width": layout.contentNarrow,
    "margin-bottom": space[10],
  },

  // ── Detail sections ──
  detailBlock: {
    display: "flex",
    "flex-direction": "column",
    gap: space[5],
    "padding-top": space[8],
    "border-top": `1px solid ${colors.border}`,
    "margin-bottom": space[8],
  },
  detailRow: {
    display: "flex",
    gap: space[6],
    "align-items": "flex-start",
  },
  detailLabel: {
    "font-size": text.xs,
    "font-weight": "600",
    "letter-spacing": "0.1em",
    "text-transform": "uppercase",
    color: colors.textFaint,
    "min-width": "110px",
    "padding-top": "0.2em",
    "flex-shrink": "0",
  },
  detailValue: {
    "font-size": text.base,
    color: colors.textMuted,
    "line-height": "1.7",
  },
  detailValueOutcome: {
    "font-size": text.base,
    color: colors.text,
    "line-height": "1.7",
  },

  // ── Highlights ──
  highlightsBlock: {
    "padding-top": space[8],
    "border-top": `1px solid ${colors.border}`,
    "margin-bottom": space[8],
  },
  highlightsLabel: {
    "font-size": text.xs,
    "font-weight": "600",
    "letter-spacing": "0.1em",
    "text-transform": "uppercase",
    color: colors.textFaint,
    "margin-bottom": space[5],
  },
  highlightsList: {
    display: "flex",
    "flex-direction": "column",
    gap: space[3],
    "list-style": "none",
    padding: "0",
    margin: "0",
  },
  highlightItem: {
    display: "flex",
    gap: space[3],
    "align-items": "flex-start",
    "font-size": text.base,
    color: colors.textMuted,
    "line-height": "1.65",
  },
  highlightDot: {
    "font-size": "0.45rem",
    color: colors.accent,
    "padding-top": "0.55em",
    "flex-shrink": "0",
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
  linkBack: {
    "margin-left": "auto",
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

// ─── Route ────────────────────────────────────────────────────────────────────

export default function CaseStudyPage() {
  const params = useParams<{ slug: string }>();
  const project = () => PROJECTS.find((p) => p.slug === params.slug);

  const trackExternal = (label: string) => () =>
    analytics.trackEvent("featured_work_click", {
      slug: params.slug,
      location: label,
    });

  return (
    <Show
      when={project()}
      fallback={
        <>
          <HttpStatusCode code={404} />
          <PageMeta
            title="Case study not found"
            description="That project doesn't exist."
            noIndex
          />
          <div style={pageStyles.page}>
            <p style={pageStyles.eyebrow}>Work</p>
            <h1 style={pageStyles.pageHeading}>Project not found.</h1>
            <p style={pageStyles.bodyText}>
              That case study URL doesn't match any project in the portfolio.
            </p>
            <A href="/work" style={s.linkPrimary}>
              ← All projects
            </A>
          </div>
        </>
      }
    >
      {(p) => (
        <>
          <PageMeta
            title={`${p().title} — Case Study`}
            description={p().tagline}
            ogImage="/og/work.svg"
          />

          <div style={s.page}>
            {/* Back link */}
            <A href="/work" style={s.backLink}>
              ← All projects
            </A>

            {/* Header */}
            <p style={pageStyles.eyebrow}>{KIND_LABELS[p().kind]}</p>
            <div style={s.headerTop}>
              <h1 style={s.title}>{p().title}</h1>
              <span style={s.kindBadge}>{KIND_LABELS[p().kind]}</span>
            </div>
            <div style={s.meta}>
              {p().role} · {p().period}
            </div>
            <p style={s.tagline}>{p().tagline}</p>

            {/* What + Challenges + Architecture + Outcome */}
            <div style={s.detailBlock}>
              <div class="case-detail-row" style={s.detailRow}>
                <span style={s.detailLabel}>What</span>
                <span style={s.detailValue}>{p().description}</span>
              </div>
              <Show when={p().challenges}>
                <div class="case-detail-row" style={s.detailRow}>
                  <span style={s.detailLabel}>Challenge</span>
                  <span style={s.detailValue}>{p().challenges}</span>
                </div>
              </Show>
              <div class="case-detail-row" style={s.detailRow}>
                <span style={s.detailLabel}>Architecture</span>
                <span style={s.detailValue}>{p().architecture}</span>
              </div>
              <div class="case-detail-row" style={s.detailRow}>
                <span style={s.detailLabel}>Outcome</span>
                <span style={s.detailValueOutcome}>{p().outcome}</span>
              </div>
            </div>

            {/* Highlights */}
            <Show when={p().highlights?.length}>
              <div style={s.highlightsBlock}>
                <p style={s.highlightsLabel}>Highlights</p>
                <ul style={s.highlightsList}>
                  <For each={p().highlights}>
                    {(item) => (
                      <li style={s.highlightItem}>
                        <span style={s.highlightDot}>●</span>
                        <span>{item}</span>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            </Show>

            {/* Tech stack */}
            <div style={s.tagSection}>
              <p style={s.tagSectionLabel}>Stack</p>
              <div style={s.tagRow}>
                <For each={p().tech}>{(tag) => <span style={s.tag}>{tag}</span>}</For>
              </div>
            </div>

            {/* External links + back */}
            <div style={s.linksSection}>
              <Show when={p().url}>
                <a
                  href={p().url}
                  style={s.linkPrimary}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackExternal("case_study_external")}
                >
                  {p().urlLabel ?? "View project ↗"}
                </a>
              </Show>
              <Show when={p().repoUrl && p().repoUrl !== p().url}>
                <a
                  href={p().repoUrl}
                  style={s.linkSecondary}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackExternal("case_study_repo")}
                >
                  Source →
                </a>
              </Show>
              <A href="/work" style={s.linkBack}>
                ← All projects
              </A>
            </div>
          </div>
        </>
      )}
    </Show>
  );
}
