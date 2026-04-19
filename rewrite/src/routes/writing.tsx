import { PageMeta } from "~/components/PageMeta";
import { colors } from "~/styles/tokens";
import type { JSX } from "solid-js";

const styles: Record<string, JSX.CSSProperties> = {
  page: {
    "max-width": "780px",
    margin: "0 auto",
    padding: "4rem 2rem",
  },
  eyebrow: {
    "font-size": "0.75rem",
    "font-weight": "600",
    "letter-spacing": "0.12em",
    "text-transform": "uppercase",
    color: colors.accent,
    "margin-bottom": "1rem",
  },
  heading: {
    "font-size": "clamp(1.75rem, 4vw, 2.5rem)",
    "font-weight": "700",
    color: "#f1f5f9",
    "margin-bottom": "1rem",
    "letter-spacing": "-0.03em",
  },
  description: {
    color: colors.textMuted,
    "font-size": "1.05rem",
    "line-height": "1.7",
    "max-width": "560px",
    "margin-bottom": "3rem",
  },
  scaffold: {
    padding: "2rem",
    border: `1px dashed ${colors.border}`,
    "border-radius": "8px",
    color: colors.textFaint,
    "font-size": "0.875rem",
    "line-height": "1.6",
  },
};

export default function WritingPage() {
  return (
    <>
      <PageMeta
        title="Writing"
        description="Articles, blog posts, and technical writing by Dev Agrawal on SolidJS, fullstack development, and developer experience."
      />
      <div style={styles.page}>
        <p style={styles.eyebrow}>Articles</p>
        <h1 style={styles.heading}>Writing</h1>
        <p style={styles.description}>
          Technical articles and blog posts on SolidJS, TanStack, local-first architecture, and
          building great developer experiences.
        </p>
        <div style={styles.scaffold}>Content scaffolded — articles and posts coming soon.</div>
      </div>
    </>
  );
}
