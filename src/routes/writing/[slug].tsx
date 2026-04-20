import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import { A, useParams } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { analytics } from "~/config/analytics";
import { PageMeta } from "~/components/PageMeta";
import { pageStyles } from "~/styles/recipes";
import { colors, layout, radius, space, text } from "~/styles/tokens";
import { ARTICLES } from "~/data/writing";

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, JSX.CSSProperties> = {
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
  title: {
    "font-size": text.pageHeading,
    "font-weight": "700",
    color: colors.textBright,
    "letter-spacing": "-0.03em",
    "line-height": "1.2",
    "margin-bottom": space[3],
  },
  meta: {
    display: "flex",
    "align-items": "center",
    gap: space[3],
    "flex-wrap": "wrap",
    "margin-bottom": space[8],
  },
  metaDate: {
    "font-size": text.xs,
    color: colors.textFaint,
  },
  metaDot: {
    "font-size": text.xs,
    color: colors.border,
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

  // ── Prose body ──
  body: {
    "border-top": `1px solid ${colors.border}`,
    "padding-top": space[10],
    "max-width": layout.contentNarrow,
  },
  sectionHeading: {
    "font-size": text.lg,
    "font-weight": "700",
    color: colors.textBright,
    "margin-top": space[10],
    "margin-bottom": space[4],
    "letter-spacing": "-0.01em",
  },
  paragraph: {
    "font-size": text.md,
    color: colors.textMuted,
    "line-height": "1.75",
    "margin-bottom": space[5],
  },

  // ── Footer ──
  footer: {
    "border-top": `1px solid ${colors.border}`,
    "padding-top": space[8],
    "margin-top": space[12],
  },
  footerLink: {
    "font-size": text.sm,
    color: colors.textFaint,
    "text-decoration": "none",
  },
};

// ─── Route ────────────────────────────────────────────────────────────────────

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const article = () => ARTICLES.find((a) => a.slug === params.slug && a.kind === "technical");

  const trackRead = () =>
    analytics.trackEvent("writing_click", { slug: params.slug, location: "article_page" });

  return (
    <Show
      when={article()}
      fallback={
        <>
          <HttpStatusCode code={404} />
          <PageMeta title="Article not found" description="That article doesn't exist." noIndex />
          <div style={pageStyles.page}>
            <p style={pageStyles.eyebrow}>Writing</p>
            <h1 style={pageStyles.pageHeading}>Article not found.</h1>
            <p style={pageStyles.bodyText}>That URL doesn't match any article in this portfolio.</p>
            <A href="/writing" style={{ "font-size": text.sm, color: colors.accent }}>
              ← All writing
            </A>
          </div>
        </>
      }
    >
      {(a) => (
        <>
          <PageMeta title={a().title} description={a().description} ogImage="/og/writing.svg" />

          <div style={pageStyles.page}>
            {/* Back */}
            <A href="/writing" style={s.backLink}>
              ← All writing
            </A>

            {/* Header */}
            <p style={pageStyles.eyebrow}>Technical</p>
            <h1 style={s.title}>{a().title}</h1>
            <div style={s.meta}>
              <span style={s.metaDate}>{a().displayDate}</span>
              <span style={s.metaDot}>·</span>
              <For each={a().tags}>{(tag) => <span style={s.tag}>{tag}</span>}</For>
            </div>

            {/* Prose sections */}
            <Show when={a().sections?.length}>
              <div style={s.body} onClick={trackRead}>
                <For each={a().sections}>
                  {(section) => (
                    <>
                      <Show when={section.heading}>
                        <h2 style={s.sectionHeading}>{section.heading}</h2>
                      </Show>
                      <For each={section.body.split("\n\n")}>
                        {(para) => <p style={s.paragraph}>{para}</p>}
                      </For>
                    </>
                  )}
                </For>
              </div>
            </Show>

            {/* Footer */}
            <div style={s.footer}>
              <A href="/writing" style={s.footerLink}>
                ← Back to writing
              </A>
            </div>
          </div>
        </>
      )}
    </Show>
  );
}
