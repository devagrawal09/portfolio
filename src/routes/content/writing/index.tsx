import { For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { ContentShell } from "~/components/ContentShell";
import { PageMeta } from "~/components/PageMeta";
import { analytics } from "~/config/analytics";
import { sortedArticles, technicalArticles, type Article } from "~/data/writing";

const featuredPost = technicalArticles[0];
const duplicateIndexSlugs = new Set([
  "devto-clerk-webhooks-data-sync-convex",
  "medium-clerk-webhooks-data-sync-convex",
  "devto-clerk-webhooks-getting-started",
  "medium-clerk-webhooks-getting-started",
  "medium-server-components-websockets",
  "medium-serverless-deployment",
  "medium-isomorphic-code",
]);
const indexArticles = sortedArticles.filter((article) => !duplicateIndexSlugs.has(article.slug));

function ArticleCard(props: { article: Article }) {
  const trackClick = () =>
    analytics.trackEvent("writing_click", {
      slug: props.article.slug,
      location: "writing_index",
    });

  const content = (
    <span>
      <strong>{props.article.title}</strong>
      <em>{props.article.description}</em>
    </span>
  );

  const href = () =>
    props.article.contentPath || props.article.sections?.length
      ? `/content/writing/${props.article.slug}`
      : (props.article.url ?? `/content/writing#${props.article.slug}`);

  return (
    <Show
      when={
        !props.article.contentPath &&
        !props.article.sections?.length &&
        props.article.url?.startsWith("http")
      }
      fallback={
        <A
          href={href()}
          class="sketch-card content-card article-card"
          id={props.article.slug}
          onClick={trackClick}
        >
          {content}
        </A>
      }
    >
      <a
        href={props.article.url ?? "/content/writing"}
        target="_blank"
        rel="noopener noreferrer"
        class="sketch-card content-card article-card"
        id={props.article.slug}
        onClick={trackClick}
      >
        {content}
      </a>
    </Show>
  );
}

function FeaturedArticle(props: { article: Article }) {
  const content = (
    <span>
      <small>Featured Blog Post</small>
      {props.article.title}
    </span>
  );

  const href = () =>
    props.article.contentPath || props.article.sections?.length
      ? `/content/writing/${props.article.slug}`
      : (props.article.url ?? "/content/writing");

  return (
    <Show
      when={
        !props.article.contentPath &&
        !props.article.sections?.length &&
        props.article.url?.startsWith("http")
      }
      fallback={
        <A href={href()} class="sketch-card content-featured">
          {content}
        </A>
      }
    >
      <a
        href={props.article.url ?? "/content/writing"}
        target="_blank"
        rel="noopener noreferrer"
        class="sketch-card content-featured"
      >
        {content}
      </a>
    </Show>
  );
}

export default function ContentWritingPage() {
  return (
    <>
      <PageMeta
        title="Content"
        description="Writing by Dev Agrawal on fullstack engineering, reactive UI, local-first software, and AI systems."
        ogImage="/og/writing.svg"
      />

      <ContentShell>
        <FeaturedArticle article={featuredPost} />

        <section class="article-index" aria-label="Writing">
          <div class="article-list">
            <For each={indexArticles}>{(article) => <ArticleCard article={article} />}</For>
          </div>
        </section>
      </ContentShell>
    </>
  );
}
