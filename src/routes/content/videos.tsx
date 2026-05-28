import { For } from "solid-js";
import { ContentShell } from "~/components/ContentShell";
import { PageMeta } from "~/components/PageMeta";
import { videos as youtubeVideos, type Video } from "~/data/videos";

const videos = youtubeVideos.filter((video) => video.kind !== "stream");

function VideoItem(props: { video: Video }) {
  return (
    <a
      href={props.video.url}
      target="_blank"
      rel="noopener noreferrer"
      class="sketch-card content-card article-card video-card"
    >
      <span>
        <strong>{props.video.title}</strong>
        <em>{props.video.date}</em>
        <small>{props.video.kind}</small>
      </span>
    </a>
  );
}

export default function ContentVideosPage() {
  return (
    <>
      <PageMeta
        title="Videos"
        description="Recorded talks, podcasts, workshops, and community sessions by Dev Agrawal."
        ogImage="/og/talks.svg"
      />

      <ContentShell>
        <section class="content-section" aria-label="Videos">
          <div class="article-list">
            <For each={videos}>{(video) => <VideoItem video={video} />}</For>
          </div>
        </section>
      </ContentShell>
    </>
  );
}
