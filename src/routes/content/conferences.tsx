import { AppearanceGrid } from "~/components/AppearanceGrid";
import { ContentShell } from "~/components/ContentShell";
import { PageMeta } from "~/components/PageMeta";
import { analytics } from "~/config/analytics";
import { SPEAKING_EMAIL_HREF } from "~/data/contact";
import { conferences } from "~/data/talks";

export default function ContentConferencesPage() {
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

      <ContentShell>
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
