import { AppearanceGrid } from "~/components/AppearanceGrid";
import { ContentShell } from "~/components/ContentShell";
import { PageMeta } from "~/components/PageMeta";
import { analytics } from "~/config/analytics";
import { SPEAKING_EMAIL_HREF } from "~/data/contact";
import { contentTabCounts } from "./contentCounts";

const podcasts = [
  {
    title: "How to be notable, event sourcing, and SolidJS",
    event: "ConTejas Code",
    location: "Berlin, Germany",
    date: "Jun 2025",
    url: "https://youtu.be/sOiJLddxw_Y?si=5U30lww5TmD18GvA",
    kind: "podcast",
  },
  {
    title: "Building Async UIs without the hassle",
    event: "PodRocket",
    location: "Virtual",
    date: "Feb 2025",
    url: "https://podrocket.logrocket.com/building-async-uis-without-the-hassle-dev-agrawal",
    kind: "podcast",
  },
  {
    title: "Solid.js IS REALLY FAST! Concept breakdown",
    event: "The Programming Podcast",
    location: "Virtual",
    date: "Jan 2025",
    url: "https://www.youtube.com/watch?v=TwpcWoZCQ_4",
    kind: "podcast",
  },
  {
    title: "Realtime Frameworks",
    event: "AJC and the Web Devs",
    location: "Virtual",
    date: "Dec 2024",
    url: "https://www.youtube.com/live/q8AlF3QcR2M?si=hdyr5Gu8ie0Lcsbx",
    kind: "podcast",
  },
  {
    title: "Nitro, Vinxi, and RSCs",
    event: "What's Good (Egghead.io)",
    location: "Virtual",
    date: "Sep 2024",
    url: "https://egghead.io/nitro-vinxi-and-rscs-whats-good-with-dev-agrawal~s577t",
    kind: "podcast",
  },
  {
    title: "Build your own metaframework with Vinxi",
    event: "Learn With Jason",
    location: "Virtual",
    date: "Jul 2024",
    url: "https://www.youtube.com/live/2m9ErnaDy6s?si=o5XAnyr0XzDzXFXD",
    kind: "podcast",
  },
  {
    title: "What's New in React 19 (and What That Means for You)",
    event: "Scrimba Podcast",
    location: "Virtual",
    date: "Jun 2024",
    url: "https://www.youtube.com/watch?v=8GuvVaEWjzk",
    kind: "podcast",
  },
  {
    title: "Local-First Application Development is Back?",
    event: "Modern Web Podcast",
    location: "Virtual",
    date: "May 2024",
    url: "https://www.youtube.com/watch?v=0bYeHVAk_EM",
    kind: "podcast",
  },
  {
    title: "The State of React (and Should You Still Learn It in 2024)",
    event: "Scrimba Podcast",
    location: "Virtual",
    date: "Feb 2024",
    url: "https://www.youtube.com/watch?v=nD1V18VBNcw",
    kind: "podcast",
  },
  {
    title: "From College Student to Speaking at Conferences",
    event: "Guidance Counselor 2.0",
    location: "Virtual",
    date: "Feb 2024",
    url: "https://www.linkedin.com/posts/taylordesseyn_from-college-student-to-speaking-at-conferences-activity-7163192438377926657-VOoy",
    kind: "podcast",
  },
  {
    title: "I got CAUGHT rolling my own auth..",
    event: "Backend Banter",
    location: "Virtual",
    date: "Jan 2024",
    url: "https://www.youtube.com/watch?v=xjcvlddL398",
    kind: "podcast",
  },
  {
    title: "Clerk, Authentication, Web Dev, All the Things",
    event: "Nicky T Live",
    location: "Virtual",
    date: "Sep 2023",
    url: "https://www.youtube.com/watch?v=vlxkTAzNm5Y",
    kind: "podcast",
  },
] as const;

export default function podcastsPage() {
  const trackSpeakingCta = () => {
    analytics.trackEvent("cta_speaking", { location: "content_podcasts" });
  };

  return (
    <>
      <PageMeta
        title="Podcasts"
        description="Podcast and show appearances by Dev Agrawal on web development, SolidJS, auth, local-first software, and reactive UI."
        ogImage="/og/talks.svg"
      />
      <ContentShell tabCounts={contentTabCounts}>
        <AppearanceGrid heading="Podcasts & Shows" items={podcasts} />
        <div class="content-cta">
          <p>Interested in having me on your podcast or show?</p>
          <a href={SPEAKING_EMAIL_HREF} class="sketch-button" onClick={trackSpeakingCta}>
            Get in touch
          </a>
        </div>
      </ContentShell>
    </>
  );
}
