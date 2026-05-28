import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import { A } from "@solidjs/router";
import { marked } from "marked";
import { analytics } from "~/config/analytics";
import { MarkdownContent } from "~/components/MarkdownContent";
import { PageMeta } from "~/components/PageMeta";
import { pageStyles } from "~/styles/recipes";
import { colors, radius, space, text } from "~/styles/tokens";

export type ArticlePageData = {
  slug: string;
  title: string;
  description: string;
  displayDate: string;
  kind: "technical" | "reflection";
  tags: readonly string[];
  markdown: string;
  source?: string;
  originalUrl?: string;
};

const s: Record<string, JSX.CSSProperties> = {
  backLink: {
    display: "inline-flex",
    "align-items": "center",
    gap: space[2],
    "font-size": text.sm,
    color: colors.textFaint,
    "margin-bottom": space[10],
    "text-decoration": "none",
  },
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
  metaDate: { "font-size": text.xs, color: colors.textFaint },
  metaDot: { "font-size": text.xs, color: colors.border },
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
  body: { "border-top": `1px solid ${colors.border}`, "padding-top": space[10] },
  footer: {
    "border-top": `1px solid ${colors.border}`,
    "padding-top": space[8],
    "margin-top": space[12],
  },
  footerLinks: { display: "flex", gap: space[5], "flex-wrap": "wrap" },
  footerLink: { "font-size": text.sm, color: colors.textFaint, "text-decoration": "none" },
};

export function ArticlePage(props: { article: ArticlePageData }) {
  const html = () => marked.parse(props.article.markdown, { async: false }) as string;
  const trackRead = () =>
    analytics.trackEvent("writing_click", { slug: props.article.slug, location: "article_page" });

  return (
    <>
      <PageMeta
        title={props.article.title}
        description={props.article.description}
        ogImage="/og/writing.svg"
      />
      <div style={pageStyles.page}>
        <A href="/content/writing" style={s.backLink}>
          ← All writing
        </A>
        <p style={pageStyles.eyebrow}>
          {props.article.kind === "technical" ? "Technical" : "Reflection"}
        </p>
        <h1 style={s.title}>{props.article.title}</h1>
        <div style={s.meta}>
          <Show when={props.article.source}>
            <span style={s.metaDate}>{props.article.source}</span>
            <span style={s.metaDot}>·</span>
          </Show>
          <span style={s.metaDate}>{props.article.displayDate}</span>
          <span style={s.metaDot}>·</span>
          <For each={props.article.tags}>{(tag) => <span style={s.tag}>{tag}</span>}</For>
        </div>
        <div style={s.body} onClick={trackRead}>
          <MarkdownContent html={html()} />
        </div>
        <div style={s.footer}>
          <div style={s.footerLinks}>
            <A href="/content/writing" style={s.footerLink}>
              ← Back to writing
            </A>
            <Show when={props.article.originalUrl}>
              {(url) => (
                <a href={url()} target="_blank" rel="noopener noreferrer" style={s.footerLink}>
                  Original publication →
                </a>
              )}
            </Show>
          </div>
        </div>
      </div>
    </>
  );
}
