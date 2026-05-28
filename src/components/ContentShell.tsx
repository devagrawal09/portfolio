import { A, useLocation } from "@solidjs/router";
import type { ParentProps } from "solid-js";
import { For } from "solid-js";
import { sortedArticles } from "~/data/writing";
import { conferences, meetups, podcasts } from "~/data/talks";
import { videos as youtubeVideos } from "~/data/videos";

const videos = youtubeVideos.filter((video) => video.kind !== "stream");

const tabs = [
  { label: "Writing", count: sortedArticles.length, href: "/content/writing", tone: "writing" },
  { label: "Videos", count: videos.length, href: "/content/videos", tone: "videos" },
  {
    label: "Conferences",
    count: conferences.length,
    href: "/content/conferences",
    tone: "conferences",
  },
  { label: "Podcasts", count: podcasts.length, href: "/content/podcasts", tone: "podcasts" },
  { label: "Meetups", count: meetups.length, href: "/content/meetups", tone: "meetups" },
] as const;

export function ContentShell(props: ParentProps) {
  const location = useLocation();
  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);
  const activeTone = () => tabs.find((tab) => isActive(tab.href))?.tone ?? "writing";

  return (
    <div class={`sketch-page content-page content-tone-${activeTone()}`}>
      <h1 class="sketch-heading">Content</h1>
      <p class="content-intro">
        Writing, talks, podcasts, and videos about fullstack engineering, reactive UI, local-first
        software, and AI systems.
      </p>

      <nav class="content-tabs" aria-label="Content sections">
        <For each={tabs}>
          {(tab) => (
            <A
              href={tab.href}
              class={`content-tab content-tab-${tab.tone}`}
              classList={{ active: isActive(tab.href) }}
            >
              <span>{tab.label}</span>
              <strong>{tab.count}</strong>
            </A>
          )}
        </For>
      </nav>

      {props.children}
    </div>
  );
}
