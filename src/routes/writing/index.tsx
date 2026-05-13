import { For } from "solid-js";
import { A } from "@solidjs/router";
import { PageMeta } from "~/components/PageMeta";
import { ARTICLES, technicalArticles } from "~/data/writing";
import { appearances } from "~/data/talks";

const featuredPost = technicalArticles[0];
const blogPosts = ARTICLES.filter((article) => article.slug !== featuredPost.slug).slice(0, 3);
const conferenceTalks = appearances
  .filter((appearance) => appearance.kind === "conference")
  .slice(0, 3);

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

        <A href={featuredPost.url ?? "/writing"} class="sketch-card content-featured">
          <span>
            <small>Featured Blog Post</small>
            {featuredPost.title}
          </span>
        </A>

        <div class="content-grid">
          <section class="content-column" aria-label="Blog posts">
            <For each={blogPosts}>
              {(article) => (
                <A href={article.url ?? "/writing"} class="sketch-card content-card">
                  <span>
                    <small>Blog Post</small>
                    {article.title}
                  </span>
                </A>
              )}
            </For>
            <A href="/blog" class="sketch-button content-view-all">
              View All
            </A>
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
