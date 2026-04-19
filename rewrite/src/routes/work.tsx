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

export default function WorkPage() {
  return (
    <>
      <PageMeta
        title="Work"
        description="Developer relations work, fullstack projects, and professional highlights from Dev Agrawal."
      />
      <div style={styles.page}>
        <p style={styles.eyebrow}>Experience</p>
        <h1 style={styles.heading}>Work</h1>
        <p style={styles.description}>
          DevRel at PowerSync, building developer tools, demos, and technical content for
          local-first and realtime applications.
        </p>
        <div style={styles.scaffold}>
          Content scaffolded — work history, projects, and case studies coming soon.
        </div>
      </div>
    </>
  );
}
