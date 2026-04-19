import { PageMeta } from "~/components/PageMeta";
import { pageStyles } from "~/styles/recipes";

export default function TalksPage() {
  return (
    <>
      <PageMeta
        title="Talks"
        description="Conference talks and workshop sessions by Dev Agrawal on SolidJS, TanStack, and modern fullstack development."
      />
      <div style={pageStyles.page}>
        <p style={pageStyles.eyebrow}>Speaking</p>
        <h1 style={pageStyles.pageHeading}>Talks</h1>
        <p style={pageStyles.bodyText}>
          Conference talks and workshops on modern fullstack patterns, SolidJS, TanStack, and
          developer experience.
        </p>
        <div style={pageStyles.scaffoldNote}>
          Content scaffolded — talk recordings, slides, and event history coming soon.
        </div>
      </div>
    </>
  );
}
