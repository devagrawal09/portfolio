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

export default function OpenSourcePage() {
  return (
    <>
      <PageMeta
        title="Open Source"
        description="Open source contributions to SolidJS, TanStack Start, and other projects by Dev Agrawal."
      />
      <div style={styles.page}>
        <p style={styles.eyebrow}>Community</p>
        <h1 style={styles.heading}>Open Source</h1>
        <p style={styles.description}>
          Contributions to SolidJS, TanStack Start, and other open source projects across the modern
          web ecosystem.
        </p>
        <div style={styles.scaffold}>
          Content scaffolded — projects, contributions, and maintainer highlights coming soon.
        </div>
      </div>
    </>
  );
}
