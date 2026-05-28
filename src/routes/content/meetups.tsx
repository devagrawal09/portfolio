import { AppearanceGrid } from "~/components/AppearanceGrid";
import { ContentShell } from "~/components/ContentShell";
import { PageMeta } from "~/components/PageMeta";
import { contentTabCounts } from "./contentCounts";

const meetups = [
  {
    title: "Sign-in Sessions: The most powerful authentication tool",
    event: "Certified Fresh Events",
    location: "Virtual",
    date: "Sep 2023",
    url: "https://www.youtube.com/watch?v=MYIIuF1ELxM",
    kind: "meetup",
  },
  {
    title: "Intro to modern Cloud services",
    event: "ACM@UC",
    location: "Cincinnati, OH",
    date: "Nov 2022",
    url: "https://www.youtube.com/watch?v=EyGMpEgmRMo",
    kind: "meetup",
  },
  {
    title: "Workshop — React Dojo",
    event: "ITSA + CECH Tribunal",
    location: "Cincinnati, OH",
    date: "Nov 2021 – Mar 2022",
    kind: "meetup",
    isWorkshop: true,
  },
  {
    title: "Abstraction in Programming",
    event: "ACM@UC + ITSA",
    location: "Cincinnati, OH",
    date: "Oct 2021",
    url: "https://www.youtube.com/watch?v=cdssceyEbSU",
    kind: "meetup",
  },
  {
    title: "Docker Intro Session",
    event: "ACM@UC",
    location: "Virtual",
    date: "Mar 2020",
    url: "https://www.youtube.com/live/7c8AuQ0Nljs?si=Dak20j06WtR96Nf5",
    kind: "meetup",
  },
] as const;

export default function meetupsPage() {
  return (
    <>
      <PageMeta
        title="Meetups"
        description="Meetup and community sessions by Dev Agrawal on web development, cloud services, React, Docker, and programming abstractions."
        ogImage="/og/talks.svg"
      />
      <ContentShell tabCounts={contentTabCounts}>
        <AppearanceGrid heading="Meetups & Community" items={meetups} />
      </ContentShell>
    </>
  );
}
