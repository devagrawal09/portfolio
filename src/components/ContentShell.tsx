import { A, useLocation } from "@solidjs/router";
import type { ParentProps } from "solid-js";
import { For } from "solid-js";

type ContentTabCounts = {
  writing: number;
  videos: number;
  conferences: number;
  podcasts: number;
  meetups: number;
};

export function ContentShell(props: ParentProps<{ tabCounts: ContentTabCounts }>) {
  const location = useLocation();
  const tabs = () =>
    [
      {
        label: "Writing",
        count: props.tabCounts.writing,
        href: "/content/writing",
        tone: "writing",
      },
      { label: "Videos", count: props.tabCounts.videos, href: "/content/videos", tone: "videos" },
      {
        label: "Conferences",
        count: props.tabCounts.conferences,
        href: "/content/conferences",
        tone: "conferences",
      },
      {
        label: "Podcasts",
        count: props.tabCounts.podcasts,
        href: "/content/podcasts",
        tone: "podcasts",
      },
      {
        label: "Meetups",
        count: props.tabCounts.meetups,
        href: "/content/meetups",
        tone: "meetups",
      },
    ] as const;
  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);
  const activeTone = () => tabs().find((tab) => isActive(tab.href))?.tone ?? "writing";

  return (
    <div class={`sketch-page content-page content-tone-${activeTone()}`}>
      <h1 class="sketch-heading">Content</h1>
      <p class="content-intro">
        Writing, talks, podcasts, and videos about fullstack engineering, reactive UI, local-first
        software, and AI systems.
      </p>
      <nav class="content-tabs" aria-label="Content sections">
        <For each={tabs()}>
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
