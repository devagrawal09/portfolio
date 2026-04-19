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
  link: {
    color: colors.accent,
    "text-decoration": "none",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageMeta title="Contact" description="Get in touch with Dev Agrawal." />
      <div style={styles.page}>
        <p style={styles.eyebrow}>Get in touch</p>
        <h1 style={styles.heading}>Contact</h1>
        <p style={styles.description}>
          Reach out via{" "}
          <a href="mailto:contact@devagr.me" style={styles.link}>
            contact@devagr.me
          </a>{" "}
          or find me on{" "}
          <a
            href="https://github.com/devagrawal09"
            style={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </>
  );
}
