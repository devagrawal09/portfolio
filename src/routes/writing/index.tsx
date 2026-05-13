import { For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { PageMeta } from "~/components/PageMeta";
import { analytics } from "~/config/analytics";
import { sortedArticles, technicalArticles, type Article } from "~/data/writing";
import { appearances } from "~/data/talks";

const featuredPost = technicalArticles[0];
const conferenceTalks = appearances
  .filter((appearance) => appearance.kind === "conference")
  .slice(0, 3);
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
    props.article.contentPath
      ? `/writing/${props.article.slug}`
      : (props.article.url ?? `/writing#${props.article.slug}`);

  return (
    <Show
      when={!props.article.contentPath && props.article.url?.startsWith("http")}
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
        href={props.article.url ?? "/writing"}
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
    props.article.contentPath
      ? `/writing/${props.article.slug}`
      : (props.article.url ?? "/writing");

  return (
    <Show
      when={!props.article.contentPath && props.article.url?.startsWith("http")}
      fallback={
        <A href={href()} class="sketch-card content-featured">
          {content}
        </A>
      }
    >
      <a
        href={props.article.url ?? "/writing"}
        target="_blank"
        rel="noopener noreferrer"
        class="sketch-card content-featured"
      >
        {content}
      </a>
    </Show>
  );
}

export default function WritingPage() {
  return (
    <>
      <PageMeta
        title="Content"
        description="Blog posts, technical writing, and conference talks by Dev Agrawal."
        ogImage="/og/writing.svg"
      />

      <div class="sketch-page">
        <h1 class="sketch-heading">Content</h1>

        <FeaturedArticle article={featuredPost} />

        <div class="content-grid">
          <section class="content-column article-index" aria-label="Blog posts">
            <div class="article-list">
              <For each={indexArticles}>{(article) => <ArticleCard article={article} />}</For>
            </div>
          </section>

          <section class="content-column" aria-label="Conference talks">
            <For each={conferenceTalks}>
              {(talk) =>
                talk.url ? (
                  <a
                    href={talk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="sketch-card content-card"
                  >
                    <span>
                      <small>Conference Talk</small>
                      {talk.title}
                    </span>
                  </a>
                ) : (
                  <div class="sketch-card content-card">
                    <span>
                      <small>Conference Talk</small>
                      {talk.title}
                    </span>
                  </div>
                )
              }
            </For>
            <A href="/talks" class="sketch-button content-view-all">
              View All
            </A>
          </section>
        </div>
      </div>
    </>
  );
}
