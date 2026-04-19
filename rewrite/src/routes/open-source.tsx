import { PageMeta } from "~/components/PageMeta";
import { pageStyles } from "~/styles/recipes";

export default function OpenSourcePage() {
  return (
    <>
      <PageMeta
        title="Open Source"
        description="Open source contributions to SolidJS, TanStack Start, and other projects by Dev Agrawal."
      />
      <div style={pageStyles.page}>
        <p style={pageStyles.eyebrow}>Community</p>
        <h1 style={pageStyles.pageHeading}>Open Source</h1>
        <p style={pageStyles.bodyText}>
          Contributions to SolidJS, TanStack Start, and other open source projects across the modern
          web ecosystem.
        </p>
        <div style={pageStyles.scaffoldNote}>
          Content scaffolded — projects, contributions, and maintainer highlights coming soon.
        </div>
      </div>
    </>
  );
}
