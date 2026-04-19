import { PageMeta } from "~/components/PageMeta";
import { pageStyles } from "~/styles/recipes";

export default function WorkPage() {
  return (
    <>
      <PageMeta
        title="Work"
        description="Developer relations work, fullstack projects, and professional highlights from Dev Agrawal."
      />
      <div style={pageStyles.page}>
        <p style={pageStyles.eyebrow}>Experience</p>
        <h1 style={pageStyles.pageHeading}>Work</h1>
        <p style={pageStyles.bodyText}>
          DevRel at PowerSync, building developer tools, demos, and technical content for
          local-first and realtime applications.
        </p>
        <div style={pageStyles.scaffoldNote}>
          Content scaffolded — work history, projects, and case studies coming soon.
        </div>
      </div>
    </>
  );
}
