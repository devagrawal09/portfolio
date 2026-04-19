import { PageMeta } from "~/components/PageMeta";
import { pageStyles } from "~/styles/recipes";

export default function WritingPage() {
  return (
    <>
      <PageMeta
        title="Writing"
        description="Articles, blog posts, and technical writing by Dev Agrawal on SolidJS, fullstack development, and developer experience."
      />
      <div style={pageStyles.page}>
        <p style={pageStyles.eyebrow}>Articles</p>
        <h1 style={pageStyles.pageHeading}>Writing</h1>
        <p style={pageStyles.bodyText}>
          Technical articles and blog posts on SolidJS, TanStack, local-first architecture, and
          building great developer experiences.
        </p>
        <div style={pageStyles.scaffoldNote}>
          Content scaffolded — articles and posts coming soon.
        </div>
      </div>
    </>
  );
}
