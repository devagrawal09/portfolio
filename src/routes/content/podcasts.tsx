import { AppearanceGrid } from "~/components/AppearanceGrid";
import { ContentShell } from "~/components/ContentShell";
import { PageMeta } from "~/components/PageMeta";
import { analytics } from "~/config/analytics";
import { SPEAKING_EMAIL_HREF } from "~/data/contact";
import { podcasts } from "~/data/talks";

export default function ContentPodcastsPage() {
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

      <ContentShell>
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
