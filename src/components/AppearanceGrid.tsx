import { For, Show } from "solid-js";
import { analytics } from "~/config/analytics";
import type { Appearance } from "~/data/talks";

export function AppearanceItem(props: { item: Appearance }) {
  const trackClick = () => {
    analytics.trackEvent("talk_click", {
      title: props.item.title,
      event: props.item.event,
      kind: props.item.kind,
    });
  };

  const content = (
    <span>
      <strong>{props.item.title}</strong>
      <em>
        {props.item.event} · {props.item.location} · {props.item.date}
      </em>
      <small>
        {props.item.isWorkshop ? "Workshop" : props.item.kind}
        {!props.item.url ? " · No public recording" : ""}
      </small>
    </span>
  );

  return (
    <Show
      when={props.item.url}
      fallback={<div class="sketch-card content-card article-card video-card">{content}</div>}
    >
      {(url) => (
        <a
          href={url()}
          target="_blank"
          rel="noopener noreferrer"
          class="sketch-card content-card article-card video-card"
          onClick={trackClick}
        >
          {content}
        </a>
      )}
    </Show>
  );
}

export function AppearanceGrid(props: { heading: string; items: Appearance[] }) {
  return (
    <section class="content-section" aria-label={props.heading}>
      <div class="article-list">
        <For each={props.items}>{(item) => <AppearanceItem item={item} />}</For>
      </div>
    </section>
  );
}
