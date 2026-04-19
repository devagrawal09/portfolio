import { For } from "solid-js";
import { PageMeta } from "~/components/PageMeta";
import { colors } from "~/styles/tokens";
import type { JSX } from "solid-js";

const proofItems = [
  { label: "DevRel Engineer", detail: "PowerSync" },
  { label: "Solid Ecosystem", detail: "Contributor" },
  { label: "TanStack Start", detail: "Maintainer" },
  { label: "Conference Speaker", detail: "& Workshop Host" },
];

const styles: Record<string, JSX.CSSProperties> = {
  hero: {
    "max-width": "780px",
    margin: "0 auto",
    padding: "5rem 2rem 4rem",
  },
  eyebrow: {
    "font-size": "0.75rem",
    "font-weight": "600",
    "letter-spacing": "0.12em",
    "text-transform": "uppercase",
    color: colors.accent,
    "margin-bottom": "1rem",
  },
  headline: {
    "font-size": "clamp(2rem, 5vw, 3.25rem)",
    "font-weight": "700",
    "line-height": "1.15",
    "letter-spacing": "-0.02em",
    color: "#f1f5f9",
    "margin-bottom": "1.25rem",
  },
  subline: {
    "font-size": "1.125rem",
    color: colors.textMuted,
    "max-width": "580px",
    "margin-bottom": "2rem",
    "line-height": "1.7",
  },
  ctaRow: {
    display: "flex",
    gap: "1rem",
    "flex-wrap": "wrap",
  },
  ctaPrimary: {
    display: "inline-block",
    padding: "0.625rem 1.5rem",
    "background-color": colors.accent,
    color: colors.bg,
    "border-radius": "6px",
    "font-weight": "600",
    "font-size": "0.9rem",
  },
  ctaSecondary: {
    display: "inline-block",
    padding: "0.625rem 1.5rem",
    border: `1px solid ${colors.border}`,
    color: colors.textMuted,
    "border-radius": "6px",
    "font-size": "0.9rem",
  },
  proofBar: {
    display: "flex",
    "flex-wrap": "wrap",
    "border-top": `1px solid ${colors.border}`,
    "border-bottom": `1px solid ${colors.border}`,
    "max-width": "780px",
    margin: "0 auto",
  },
  proofItem: {
    flex: "1 1 160px",
    padding: "1.25rem 2rem",
    "border-right": `1px solid ${colors.border}`,
  },
  proofLabel: {
    display: "block",
    "font-size": "0.8rem",
    "font-weight": "700",
    color: colors.text,
    "margin-bottom": "0.2rem",
  },
  proofDetail: {
    display: "block",
    "font-size": "0.75rem",
    color: colors.textFaint,
  },
  nowSection: {
    "max-width": "780px",
    margin: "0 auto",
    padding: "3.5rem 2rem",
  },
  sectionHeading: {
    "font-size": "0.75rem",
    "font-weight": "600",
    "letter-spacing": "0.12em",
    "text-transform": "uppercase",
    color: colors.textFaint,
    "margin-bottom": "1.25rem",
  },
  nowList: {
    "list-style": "none",
    display: "flex",
    "flex-direction": "column",
    gap: "0.75rem",
    color: colors.textMuted,
    "font-size": "0.95rem",
    "line-height": "1.7",
  },
};

export default function Home() {
  return (
    <>
      <PageMeta
        title="DevRel Engineer & Fullstack Builder"
        description="Dev Agrawal — DevRel engineer shipping fullstack demos, technical content, and open source work in the Solid and TanStack ecosystems."
      />

      <section style={styles.hero}>
        <p style={styles.eyebrow}>DevRel · Fullstack · OSS</p>
        <h1 style={styles.headline}>
          Building demos, systems, and developer experiences for the modern web.
        </h1>
        <p style={styles.subline}>
          I ship fullstack demos, technical content, and open source work in the Solid and TanStack
          ecosystems. Currently DevRel at PowerSync.
        </p>
        <div style={styles.ctaRow}>
          <a href="mailto:contact@devagr.me" style={styles.ctaPrimary}>
            Get in touch
          </a>
          <a
            href="https://github.com/devagrawal09"
            style={styles.ctaSecondary}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub →
          </a>
        </div>
      </section>

      <section style={styles.proofBar}>
        <For each={proofItems}>
          {(item) => (
            <div style={styles.proofItem}>
              <span style={styles.proofLabel}>{item.label}</span>
              <span style={styles.proofDetail}>{item.detail}</span>
            </div>
          )}
        </For>
      </section>

      <section style={styles.nowSection}>
        <h2 style={styles.sectionHeading}>Currently</h2>
        <ul style={styles.nowList}>
          <li>Building local-first / realtime demos at PowerSync</li>
          <li>Maintaining TanStack Start and contributing to the Solid ecosystem</li>
          <li>Speaking at conferences and hosting workshops on modern fullstack patterns</li>
          <li>Exploring async UI, offline-first architecture, and developer tooling</li>
        </ul>
      </section>
    </>
  );
}
