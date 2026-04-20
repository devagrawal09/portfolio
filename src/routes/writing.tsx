import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import { analytics } from "~/config/analytics";
import { PageMeta } from "~/components/PageMeta";
import { colors, radius, space, text } from "~/styles/tokens";
import { pageStyles } from "~/styles/recipes";
import { technicalArticles, reflectionArticles, type Article } from "~/data/writing";

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, JSX.CSSProperties> = {
  // ── Section headers ──
  sectionLabel: {
    "font-size": text.xs,
    "font-weight": "600",
    "letter-spacing": "0.12em",
    "text-transform": "uppercase",
    color: colors.textFaint,
    "margin-bottom": space[6],
    display: "block",
  },

  // ── Article cards (featured/technical) ──
  articleList: {
    display: "flex",
    "flex-direction": "column",
    gap: space[4],
    "margin-bottom": space[14],
  },
  articleCard: {
    padding: `${space[6]} ${space[6]}`,
    "background-color": colors.bgElevated,
    "border-radius": radius.lg,
    border: `1px solid ${colors.border}`,
  },
  articleCardHeader: {
    display: "flex",
    "align-items": "flex-start",
    "justify-content": "space-between",
    gap: space[4],
    "flex-wrap": "wrap",
    "margin-bottom": space[3],
  },
  articleCardTitle: {
    "font-size": text.base,
    "font-weight": "700",
    color: colors.textBright,
  },
  articleCardDate: {
    "font-size": text.xs,
    color: colors.textFaint,
    "white-space": "nowrap",
    "flex-shrink": "0",
  },
  articleCardDesc: {
    "font-size": text.sm,
    color: colors.textMuted,
    "line-height": "1.65",
    "margin-bottom": space[4],
  },
  articleCardFooter: {
    display: "flex",
    "align-items": "center",
    "justify-content": "space-between",
    "flex-wrap": "wrap",
    gap: space[3],
  },
  articleCardTags: {
    display: "flex",
    "flex-wrap": "wrap",
    gap: space[2],
  },
  articleCardTag: {
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
  articleCardLink: {
    "font-size": text.xs,
    color: colors.accent,
    "flex-shrink": "0",
  },

  // ── Archive list (reflections) ──
  archiveDivider: {
    "border-top": `1px solid ${colors.border}`,
    "margin-bottom": space[8],
    "padding-top": space[12],
  },
  archiveList: {
    display: "flex",
    "flex-direction": "column",
  },
  archiveItem: {
    display: "flex",
    "align-items": "baseline",
    gap: space[5],
    padding: `${space[4]} 0`,
    "border-bottom": `1px solid ${colors.border}`,
  },
  archiveItemLast: {
    display: "flex",
    "align-items": "baseline",
    gap: space[5],
    padding: `${space[4]} 0`,
  },
  archiveDate: {
    "font-size": text.xs,
    color: colors.textFaint,
    "min-width": "64px",
    "flex-shrink": "0",
  },
  archiveTitle: {
    "font-size": text.base,
    "font-weight": "600",
    color: colors.text,
    "margin-bottom": "0.2rem",
  },
  archiveDesc: {
    "font-size": text.xs,
    color: colors.textFaint,
    "line-height": "1.55",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function articleCardContent(article: Article) {
  return (
    <>
      <div style={s.articleCardHeader}>
        <span style={s.articleCardTitle}>{article.title}</span>
        <span style={s.articleCardDate}>{article.displayDate}</span>
      </div>
      <p style={s.articleCardDesc}>{article.description}</p>
      <div style={s.articleCardFooter}>
        <div style={s.articleCardTags}>
          <For each={article.tags}>{(tag) => <span style={s.articleCardTag}>{tag}</span>}</For>
        </div>
        {article.url && <span style={s.articleCardLink}>Read ↗</span>}
      </div>
    </>
  );
}

function archiveRowContent(article: Article) {
  return (
    <>
      <span style={s.archiveDate}>{article.displayDate}</span>
      <div>
        <div style={s.archiveTitle}>{article.title}</div>
        <div style={s.archiveDesc}>{article.description}</div>
      </div>
    </>
  );
}

function ArticleCard(props: { article: Article; onNavigate: () => void }) {
  return (
    <Show
      when={props.article.url}
      fallback={<div style={s.articleCard}>{articleCardContent(props.article)}</div>}
    >
      <a
        href={props.article.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => props.onNavigate()}
        style={{ "text-decoration": "none" }}
      >
        <div style={s.articleCard}>{articleCardContent(props.article)}</div>
      </a>
    </Show>
  );
}

function ArchiveRow(props: { article: Article; isLast: boolean; onNavigate: () => void }) {
  const rowStyle = (): JSX.CSSProperties => (props.isLast ? s.archiveItemLast : s.archiveItem);

  return (
    <Show
      when={props.article.url}
      fallback={<div style={rowStyle()}>{archiveRowContent(props.article)}</div>}
    >
      <a
        href={props.article.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => props.onNavigate()}
        style={{ "text-decoration": "none" }}
      >
        <div style={rowStyle()}>{archiveRowContent(props.article)}</div>
      </a>
    </Show>
  );
}

// ─── Route ────────────────────────────────────────────────────────────────────

export default function WritingPage() {
  const trackClick = (slug: string) => () =>
    analytics.trackEvent("writing_click", { slug, location: "writing_page" });

  return (
    <>
      <PageMeta
        title="Writing"
        description="Technical articles and year-in-review reflections by Dev Agrawal — covering SSR, serverless, fullstack architecture, and lessons from building in the JavaScript ecosystem."
        ogImage="/og/writing.svg"
      />
      <div style={pageStyles.page}>
        <p style={pageStyles.eyebrow}>Articles</p>
        <h1 style={pageStyles.pageHeading}>Writing</h1>
        <p style={pageStyles.bodyText}>
          Technical deep-dives on SSR, serverless, and fullstack patterns — plus annual reflections
          on growing as an engineer, DevRel practitioner, and open-source contributor.
        </p>

        {/* ── Technical articles ── */}
        <h2 style={s.sectionLabel}>Technical</h2>
        <div style={s.articleList}>
          <For each={technicalArticles}>
            {(article) => <ArticleCard article={article} onNavigate={trackClick(article.slug)} />}
          </For>
        </div>

        {/* ── Year-in-review archive ── */}
        <div style={s.archiveDivider}>
          <h2 style={s.sectionLabel}>Year in Review</h2>
          <div style={s.archiveList}>
            <For each={reflectionArticles}>
              {(article, i) => (
                <ArchiveRow
                  article={article}
                  isLast={i() === reflectionArticles.length - 1}
                  onNavigate={trackClick(article.slug)}
                />
              )}
            </For>
          </div>
        </div>
      </div>
    </>
  );
}
