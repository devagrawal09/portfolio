import { AppearanceGrid } from "~/components/AppearanceGrid";
import { ContentShell } from "~/components/ContentShell";
import { PageMeta } from "~/components/PageMeta";
import { meetups } from "~/data/talks";

export default function ContentMeetupsPage() {
  return (
    <>
      <PageMeta
        title="Meetups"
        description="Meetup and community sessions by Dev Agrawal on web development, cloud services, React, Docker, and programming abstractions."
        ogImage="/og/talks.svg"
      />

      <ContentShell>
        <AppearanceGrid heading="Meetups & Community" items={meetups} />
      </ContentShell>
    </>
  );
}
