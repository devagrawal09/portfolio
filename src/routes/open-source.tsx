import { For } from "solid-js";
import type { JSX } from "solid-js";
import { analytics } from "~/config/analytics";
import { PageMeta } from "~/components/PageMeta";
import { OSS_CONTRIBUTIONS, type OssContribution } from "~/data/profile";
import { pageStyles } from "~/styles/recipes";
import { colors, radius, space, text } from "~/styles/tokens";

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, JSX.CSSProperties> = {
  // ── Stats row ──
  statsRow: {
    display: "flex",
    "flex-wrap": "wrap",
    gap: space[6],
    "margin-bottom": space[14],
    "padding-bottom": space[10],
    "border-bottom": `1px solid ${colors.border}`,
  },
  statItem: {
    display: "flex",
    "flex-direction": "column",
    gap: space[1],
  },
  statNumber: {
    "font-size": "var(--text-page-heading)",
    "font-weight": 700,
    "letter-spacing": "-0.03em",
    color: colors.textBright,
    "line-height": 1,
  },
  statLabel: {
    "font-size": text.xs,
    "font-weight": 600,
    "letter-spacing": "0.1em",
    "text-transform": "uppercase",
    color: colors.textFaint,
  },

  // ── Sections ──
  section: {
    "margin-bottom": space[12],
  },
  sectionHeading: {
    "font-size": text.xs,
    "font-weight": 600,
    "letter-spacing": "0.12em",
    "text-transform": "uppercase",
    color: colors.textFaint,
    "margin-bottom": space[5],
    "padding-bottom": space[3],
    "border-bottom": `1px solid ${colors.border}`,
  },
  cardList: {
    display: "flex",
    "flex-direction": "column",
    gap: space[4],
  },

  // ── Contribution card ──
  card: {
    "background-color": colors.bgElevated,
    border: `1px solid ${colors.border}`,
    "border-radius": radius.lg,
    padding: space[6],
  },
  cardTop: {
    display: "flex",
    "align-items": "flex-start",
    "justify-content": "space-between",
    gap: space[4],
    "flex-wrap": "wrap",
    "margin-bottom": space[2],
  },
  cardName: {
    "font-size": text.md,
    "font-weight": 700,
    color: colors.textBright,
    "letter-spacing": "-0.01em",
  },
  roleBadge: {
    "font-size": "0.7rem",
    "font-weight": 600,
    "letter-spacing": "0.08em",
    "text-transform": "uppercase",
    color: colors.accent,
    "background-color": colors.accentDim,
    border: `1px solid ${colors.accentBorder}`,
    "border-radius": radius.sm,
    padding: "0.2rem 0.55rem",
    "flex-shrink": "0",
    "align-self": "flex-start",
  },
  cardMeta: {
    "font-size": text.xs,
    color: colors.textFaint,
    "margin-bottom": space[3],
  },
  cardDesc: {
    "font-size": text.sm,
    color: colors.textMuted,
    "line-height": "1.65",
    "margin-bottom": space[4],
  },
  cardLink: {
    "font-size": text.sm,
    color: colors.accent,
    "font-weight": 600,
    "text-decoration": "none",
  },

  // ── CTA ──
  ctaRow: {
    "margin-top": space[12],
    "padding-top": space[8],
    "border-top": `1px solid ${colors.border}`,
    display: "flex",
    gap: space[4],
    "align-items": "center",
    "flex-wrap": "wrap",
  },
  ctaText: {
    "font-size": text.sm,
    color: colors.textMuted,
    flex: "1 1 auto",
  },
  ctaLink: {
    display: "inline-block",
    padding: `0.5rem 1.25rem`,
    "background-color": colors.accent,
    color: colors.bg,
    "border-radius": radius.md,
    "font-weight": 600,
    "font-size": text.sm,
    "text-decoration": "none",
    "white-space": "nowrap",
  },
};

// ─── Data slices ──────────────────────────────────────────────────────────────

const coreAndMaintainer = OSS_CONTRIBUTIONS.filter(
  (c) => c.role === "Core Team" || c.role === "Maintainer"
);
const authored = OSS_CONTRIBUTIONS.filter((c) => c.role === "Author");
const contributed = OSS_CONTRIBUTIONS.filter((c) => c.role === "Contributor");

// ─── Sub-components ───────────────────────────────────────────────────────────

function ContributionCard(props: { item: OssContribution }) {
  const trackClick = () =>
    analytics.trackEvent("oss_click", {
      name: props.item.name,
      role: props.item.role,
    });

  return (
    <article style={s.card}>
      <div style={s.cardTop}>
        <span style={s.cardName}>{props.item.name}</span>
        <span style={s.roleBadge}>{props.item.role}</span>
      </div>
      <div style={s.cardMeta}>Since {props.item.since}</div>
      <p style={s.cardDesc}>{props.item.description}</p>
      <a
        href={props.item.url}
        style={s.cardLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackClick}
      >
        View on GitHub ↗
      </a>
    </article>
  );
}

function ContributionSection(props: { heading: string; items: OssContribution[] }) {
  return (
    <div style={s.section}>
      <h2 style={s.sectionHeading}>{props.heading}</h2>
      <div style={s.cardList}>
        <For each={props.items}>{(item) => <ContributionCard item={item} />}</For>
      </div>
    </div>
  );
}

// ─── Route ────────────────────────────────────────────────────────────────────

export default function OpenSourcePage() {
  const trackGithubCta = () =>
    analytics.trackEvent("social_click", { platform: "github", location: "oss_page_cta" });

  return (
    <>
      <PageMeta
        title="Open Source"
        description="Dev Agrawal's open source work — Solid.js core team member, TanStack Start maintainer, and author of solid-socket and solid-events."
      />
      <div style={pageStyles.page}>
        <p style={pageStyles.eyebrow}>Open Source</p>
        <h1 style={pageStyles.pageHeading}>Open Source</h1>
        <p style={pageStyles.bodyText}>
          Framework-level contributor in the Solid and TanStack ecosystems — from core team
          membership to authored libraries that push what reactive, realtime, and event-driven
          patterns can look like on the modern web.
        </p>

        <div style={s.statsRow}>
          <div style={s.statItem}>
            <span style={s.statNumber}>{OSS_CONTRIBUTIONS.length}</span>
            <span style={s.statLabel}>Projects</span>
          </div>
          <div style={s.statItem}>
            <span style={s.statNumber}>{coreAndMaintainer.length}</span>
            <span style={s.statLabel}>Core / Maintainer</span>
          </div>
          <div style={s.statItem}>
            <span style={s.statNumber}>{authored.length}</span>
            <span style={s.statLabel}>Authored</span>
          </div>
        </div>

        <ContributionSection heading="Core &amp; Maintainer Roles" items={coreAndMaintainer} />
        <ContributionSection heading="Authored Libraries" items={authored} />
        <ContributionSection heading="Community Contributions" items={contributed} />

        <div style={s.ctaRow}>
          <p style={s.ctaText}>
            Building something in the Solid or TanStack ecosystem? I&apos;m open to collaboration
            and contributions.
          </p>
          <a
            href="https://github.com/devagrawal09"
            style={s.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackGithubCta}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </>
  );
}
