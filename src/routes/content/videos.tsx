import { For } from "solid-js";
import { ContentShell } from "~/components/ContentShell";
import { PageMeta } from "~/components/PageMeta";
import { contentTabCounts } from "./contentCounts";

type Video = { title: string; url: string; date: string; kind: "video" | "short" };

const videos = [
  {
    title: "Specter - Supercharging App Development with AI",
    url: "https://www.youtube.com/watch?v=rpU3z6ruMV8",
    date: "May 2026",
    kind: "video",
  },
  {
    title: "Building Asynchronous UIs Without The Hassle (Codemash 2025)",
    url: "https://www.youtube.com/watch?v=pX5r_jTLbvw",
    date: "Jan 2025",
    kind: "video",
  },
  {
    title: "Building Realtime Apps Is Easy Again",
    url: "https://www.youtube.com/watch?v=Ng28HxDd8n4",
    date: "Nov 2024",
    kind: "video",
  },
  {
    title: "Gameshow for Web Developers: Trailer",
    url: "https://www.youtube.com/watch?v=TZYIWnpn3n0",
    date: "2024",
    kind: "video",
  },
  {
    title: "In Defense of Clean Architecture",
    url: "https://www.youtube.com/watch?v=MOIX_3oBAwY",
    date: "2024",
    kind: "video",
  },
  {
    title: "Meet Your New BFF: Fullstack without Duct Tape (Javascript and Friends 2023)",
    url: "https://www.youtube.com/watch?v=vAKwSEzj7sY",
    date: "2024",
    kind: "video",
  },
  {
    title: "Jamstack Is Dead... Or Is It? Architecture In Depth",
    url: "https://www.youtube.com/watch?v=qAJhkDFODuo",
    date: "2024",
    kind: "video",
  },
  {
    title: "Why I Am Excited About React Server Components",
    url: "https://www.youtube.com/watch?v=XcyrqvbgPp8",
    date: "2024",
    kind: "video",
  },
  {
    title: "Your Professional Networking Questions Answered",
    url: "https://www.youtube.com/watch?v=So0owNSsaFg",
    date: "2023",
    kind: "video",
  },
  {
    title: "Serverless Is A Lie? Reacting to Prime Video Scaling Up",
    url: "https://www.youtube.com/watch?v=3DBgQgcmI2A",
    date: "2023",
    kind: "video",
  },
  {
    title: "DELETE These 8 Other Tables Too",
    url: "https://www.youtube.com/watch?v=IZBpcLZotAE",
    date: "2023",
    kind: "video",
  },
  {
    title: "React Experts Try To Identify Libraries",
    url: "https://www.youtube.com/watch?v=Rp4u5-Fpf94",
    date: "2023",
    kind: "video",
  },
  {
    title: "The Cheat Code To Getting A Job",
    url: "https://www.youtube.com/watch?v=b0Eqv0YrfIw",
    date: "2023",
    kind: "video",
  },
  {
    title: "How To Screw Up Auth and CDN Caching",
    url: "https://www.youtube.com/watch?v=wLm7r-AhCvc",
    date: "2023",
    kind: "video",
  },
  {
    title: "Bounded Contexts in DDD",
    url: "https://www.youtube.com/watch?v=PH9gOUNwXn4",
    date: "2023",
    kind: "video",
  },
  {
    title: "How To Think About Code",
    url: "https://www.youtube.com/watch?v=6-Nqw64jGAc",
    date: "2023",
    kind: "video",
  },
  {
    title: "DDD with Event Storming",
    url: "https://www.youtube.com/watch?v=IZFcImOsvsg",
    date: "2023",
    kind: "video",
  },
  {
    title: "Let's Settle The Return Type Debate",
    url: "https://www.youtube.com/watch?v=wx4KkVGar0w",
    date: "2023",
    kind: "video",
  },
  {
    title: "The Problem With Serverless",
    url: "https://www.youtube.com/watch?v=FvA1dU2-Gwg",
    date: "2023",
    kind: "video",
  },
  {
    title: "Leaked Twitter Architecture? Reaction and Analysis",
    url: "https://www.youtube.com/watch?v=sxtqbUQqoNc",
    date: "2023",
    kind: "video",
  },
  {
    title: "You Probably Don't Know Serverless",
    url: "https://www.youtube.com/watch?v=oTex5KtQoP8",
    date: "2023",
    kind: "video",
  },
  {
    title: "What Theo Won't Tell You About Next.js",
    url: "https://www.youtube.com/watch?v=Rrz2q5uCHdE",
    date: "2023",
    kind: "video",
  },
  {
    title: "One Trick That Makes You A Better Software Developer",
    url: "https://www.youtube.com/watch?v=472zvkI8Pi4",
    date: "2023",
    kind: "video",
  },
  {
    title: "Software Engineer Reacts - Design and Architecture Roadmap",
    url: "https://www.youtube.com/watch?v=O2fjMxjMmrk",
    date: "2023",
    kind: "video",
  },
  {
    title: "Abstraction in Programming With Dev Agrawal - ACM@UC + ITSA",
    url: "https://www.youtube.com/watch?v=cdssceyEbSU",
    date: "2023",
    kind: "video",
  },
  {
    title: "Please Don't Build Microservices",
    url: "https://www.youtube.com/watch?v=u8mvpZq3RGc",
    date: "2023",
    kind: "video",
  },
  {
    title: "How To Microservice",
    url: "https://www.youtube.com/watch?v=1B1afhzoGq8",
    date: "2023",
    kind: "video",
  },
  {
    title: "What Are Microservices",
    url: "https://www.youtube.com/watch?v=mMtseEbFLpo",
    date: "2023",
    kind: "video",
  },
  {
    title: "What is DevOps?",
    url: "https://www.youtube.com/shorts/JwtAeC2WwUY",
    date: "YouTube Short",
    kind: "short",
  },
  {
    title: "Do you want to build microservices?",
    url: "https://www.youtube.com/shorts/-qEAliQ1Gk0",
    date: "YouTube Short",
    kind: "short",
  },
  {
    title: "Monday.com Structurizr Integration",
    url: "https://www.youtube.com/watch?v=MQDizT96i-4",
    date: "2021",
    kind: "video",
  },
  {
    title: "My HIP - Studying the Avengers",
    url: "https://www.youtube.com/watch?v=_99I2WLVs_M",
    date: "2020",
    kind: "video",
  },
] as const;

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
      <ContentShell tabCounts={contentTabCounts}>
        <section class="content-section" aria-label="Videos">
          <div class="article-list">
            <For each={videos}>{(video) => <VideoItem video={video} />}</For>
          </div>
        </section>
      </ContentShell>
    </>
  );
}
