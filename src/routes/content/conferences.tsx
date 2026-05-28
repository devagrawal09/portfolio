import { AppearanceGrid } from "~/components/AppearanceGrid";
import { ContentShell } from "~/components/ContentShell";
import { PageMeta } from "~/components/PageMeta";
import { analytics } from "~/config/analytics";
import { SPEAKING_EMAIL_HREF } from "~/data/contact";
import { contentTabCounts } from "./contentCounts";

const conferences = [
  {
    title: "Meet The Web Framework From The Future",
    event: "Frontend Nation",
    location: "Virtual",
    date: "Jun 2025",
    url: "https://youtu.be/WfzrVMi222s?si=Cie9OyRRu59QCCz_",
    kind: "conference",
  },
  {
    title: "Sync engine's best friend: fine-grained rendering",
    event: "Local First Conf",
    location: "Berlin, Germany",
    date: "May 2025",
    url: "https://youtu.be/YQT26cnCKqo?si=OD0GKZLoBcZfNIrO",
    kind: "conference",
  },
  {
    title: "Building Asynchronous UIs Without The Hassle",
    event: "Stir Trek",
    location: "Columbus, OH",
    date: "May 2025",
    url: "https://www.youtube.com/watch?v=N1wSVaUdV_U",
    kind: "conference",
  },
  {
    title: "Building Asynchronous UIs Without The Hassle",
    event: "Codemash",
    location: "Sandusky, OH",
    date: "Jan 2025",
    url: "https://www.youtube.com/watch?v=pX5r_jTLbvw",
    kind: "conference",
  },
  {
    title: "Harnessing Events for Reactive and AI-powered Frontends",
    event: "EDA Summit",
    location: "Virtual",
    date: "Dec 2024",
    url: "https://edasummit.com/videos/harnessing-events-for-reactive-and-ai-powered-frontends/",
    kind: "conference",
  },
  {
    title: "Deploying Stateful Realtime Services To The Edge",
    event: "Commit Your Code Conference",
    location: "Dallas, TX",
    date: "Dec 2024",
    url: "https://www.youtube.com/live/_cCmh-FrYeM?si=05mwvnxDxbZ_EAtx&t=2133",
    kind: "conference",
  },
  {
    title: "Meet the Web Framework from the Future",
    event: "Dev Innovation Summit",
    location: "Santa Clara, CA",
    date: "Nov 2024",
    kind: "conference",
  },
  {
    title: "Build your own React Metaframework",
    event: "React Rally",
    location: "Salt Lake City, UT",
    date: "Aug 2024",
    url: "https://www.youtube.com/watch?v=4V_Wz_k35C8",
    kind: "conference",
  },
  {
    title: "Streams, not Waterfalls — Improving Page Load and Core Web Vitals",
    event: "Stir Trek",
    location: "Columbus, OH",
    date: "May 2024",
    url: "https://www.youtube.com/watch?v=GrJVK6ci--s",
    kind: "conference",
  },
  {
    title: "Meet Your New BFF: Backend to Frontend without the Duct Tape",
    event: "Codemash",
    location: "Sandusky, OH",
    date: "Jan 2024",
    kind: "conference",
  },
  {
    title: "Workshop — Build an end-to-end Next.js app with auth and realtime",
    event: "Codemash",
    location: "Sandusky, OH",
    date: "Jan 2024",
    kind: "conference",
    isWorkshop: true,
  },
  {
    title: "Workshop — From Todo App to B2B SaaS with Next.js and Clerk",
    event: "React Summit US",
    location: "Jersey City, NJ",
    date: "Dec 2023",
    url: "https://gitnation.com/contents/from-todo-app-to-b2b-saas-with-nextjs-and-clerk",
    kind: "conference",
    isWorkshop: true,
  },
  {
    title: "Beyond the Login Page: Authentication in Next.js",
    event: "Next.js Conf",
    location: "San Francisco, CA",
    date: "Oct 2023",
    url: "https://www.youtube.com/watch?v=44b2U0uGQ0k",
    kind: "conference",
  },
  {
    title: "Meet Your New BFF: Fullstack without Duct Tape",
    event: "APIWorld",
    location: "Santa Clara, CA",
    date: "Oct 2023",
    kind: "conference",
  },
  {
    title: "Meet Your New BFF: Fullstack without Duct Tape",
    event: "JavaScript and Friends",
    location: "Columbus, OH",
    date: "Aug 2023",
    url: "https://www.youtube.com/watch?v=vAKwSEzj7sY",
    kind: "conference",
  },
] as const;

export default function conferencesPage() {
  const trackSpeakingCta = () => {
    analytics.trackEvent("cta_speaking", { location: "content_conferences" });
  };

  return (
    <>
      <PageMeta
        title="Conferences"
        description="Conference talks and workshops by Dev Agrawal on SolidJS, TanStack, async UI, local-first development, and fullstack architecture."
        ogImage="/og/talks.svg"
      />
      <ContentShell tabCounts={contentTabCounts}>
        <AppearanceGrid heading="Conferences & Workshops" items={conferences} />
        <div class="content-cta">
          <p>Interested in having me speak at your conference?</p>
          <a href={SPEAKING_EMAIL_HREF} class="sketch-button" onClick={trackSpeakingCta}>
            Get in touch
          </a>
        </div>
      </ContentShell>
    </>
  );
}
