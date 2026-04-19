import { PageMeta } from "~/components/PageMeta";
import { pageStyles } from "~/styles/recipes";

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About"
        description="About Dev Agrawal — DevRel engineer, open source contributor, and conference speaker."
      />
      <div style={pageStyles.page}>
        <p style={pageStyles.eyebrow}>Background</p>
        <h1 style={pageStyles.pageHeading}>About</h1>
        <p style={pageStyles.bodyText}>
          DevRel engineer at PowerSync, open source contributor to SolidJS and TanStack, and
          conference speaker on modern fullstack development.
        </p>
        <div style={pageStyles.scaffoldNote}>
          Content scaffolded — bio and background coming soon.
        </div>
      </div>
    </>
  );
}
