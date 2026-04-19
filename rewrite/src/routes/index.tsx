import { Title, Meta } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For } from "solid-js";

const proofItems = [
  { label: "DevRel Engineer", detail: "PowerSync" },
  { label: "Solid Ecosystem", detail: "Contributor" },
  { label: "TanStack Start", detail: "Maintainer" },
  { label: "Conference Speaker", detail: "& Workshop Host" },
];

export default function Home() {
  return (
    <main style={styles.main}>
      <Title>Dev Agrawal — DevRel Engineer & Fullstack Builder</Title>
      <Meta
        name="description"
        content="Dev Agrawal — DevRel engineer shipping fullstack demos, technical content, and open source work in the Solid and TanStack ecosystems."
      />

      <nav style={styles.nav}>
        <span style={styles.navBrand}>devagr.me</span>
        <div style={styles.navLinks}>
          <A href="/" style={styles.navLink}>
            Home
          </A>
          <a
            href="https://github.com/devagrawal09"
            style={styles.navLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </nav>

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

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © {new Date().getFullYear()} Dev Agrawal · Built with SolidStart v2
        </p>
      </footer>
    </main>
  );
}

const styles: Record<string, import("solid-js").JSX.CSSProperties> = {
  main: {
    "min-height": "100vh",
    "background-color": "#0d0f14",
    color: "#e2e8f0",
    "font-family": "'Inter', 'Segoe UI', system-ui, sans-serif",
    "line-height": "1.6",
  },
  nav: {
    display: "flex",
    "align-items": "center",
    "justify-content": "space-between",
    padding: "1.25rem 2rem",
    "border-bottom": "1px solid #1e2433",
  },
  navBrand: {
    "font-size": "0.95rem",
    "font-weight": "600",
    color: "#a78bfa",
    "letter-spacing": "0.03em",
  },
  navLinks: {
    display: "flex",
    gap: "1.5rem",
  },
  navLink: {
    color: "#94a3b8",
    "text-decoration": "none",
    "font-size": "0.875rem",
    transition: "color 0.15s",
  },
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
    color: "#a78bfa",
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
    color: "#94a3b8",
    "max-width": "580px",
    "margin-bottom": "2rem",
  },
  ctaRow: {
    display: "flex",
    gap: "1rem",
    "flex-wrap": "wrap",
  },
  ctaPrimary: {
    display: "inline-block",
    padding: "0.625rem 1.5rem",
    "background-color": "#a78bfa",
    color: "#0d0f14",
    "text-decoration": "none",
    "border-radius": "6px",
    "font-weight": "600",
    "font-size": "0.9rem",
    transition: "opacity 0.15s",
  },
  ctaSecondary: {
    display: "inline-block",
    padding: "0.625rem 1.5rem",
    border: "1px solid #2d3748",
    color: "#94a3b8",
    "text-decoration": "none",
    "border-radius": "6px",
    "font-size": "0.9rem",
    transition: "border-color 0.15s",
  },
  proofBar: {
    display: "flex",
    "flex-wrap": "wrap",
    gap: "0",
    "border-top": "1px solid #1e2433",
    "border-bottom": "1px solid #1e2433",
    "max-width": "780px",
    margin: "0 auto",
  },
  proofItem: {
    flex: "1 1 160px",
    padding: "1.25rem 2rem",
    "border-right": "1px solid #1e2433",
  },
  proofLabel: {
    display: "block",
    "font-size": "0.8rem",
    "font-weight": "700",
    color: "#e2e8f0",
    "margin-bottom": "0.2rem",
  },
  proofDetail: {
    display: "block",
    "font-size": "0.75rem",
    color: "#64748b",
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
    color: "#64748b",
    "margin-bottom": "1.25rem",
  },
  nowList: {
    "list-style": "none",
    padding: "0",
    margin: "0",
    display: "flex",
    "flex-direction": "column",
    gap: "0.75rem",
  },
  footer: {
    "border-top": "1px solid #1e2433",
    padding: "1.5rem 2rem",
    "text-align": "center",
  },
  footerText: {
    "font-size": "0.75rem",
    color: "#475569",
  },
};
