import { For } from "solid-js";
import type { JSX } from "solid-js";
import { analytics } from "~/config/analytics";
import { PageMeta } from "~/components/PageMeta";
import { SPEAKING_EMAIL_HREF } from "~/data/contact";
import { appearances, conferences, meetups, podcasts, type Appearance } from "~/data/talks";

import { colors, radius, space, text } from "~/styles/tokens";
import { pageStyles } from "~/styles/recipes";

const styles: Record<string, JSX.CSSProperties> = {
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
  section: {
    "margin-bottom": space[14],
  },
  sectionHeading: {
    "font-size": text.xs,
    "font-weight": 600,
    "letter-spacing": "0.12em",
    "text-transform": "uppercase",
    color: colors.textFaint,
    "margin-bottom": space[6],
    "padding-bottom": space[3],
    "border-bottom": `1px solid ${colors.border}`,
  },
  list: {
    display: "flex",
    "flex-direction": "column",
    gap: "0",
  },
  item: {
    display: "flex",
    "flex-direction": "column",
    gap: space[1],
    padding: `${space[5]} 0`,
    "border-bottom": `1px solid ${colors.border}`,
  },
  itemTop: {
    display: "flex",
    "align-items": "flex-start",
    gap: space[3],
    "flex-wrap": "wrap",
  },
  itemTitle: {
    "font-size": text.base,
    "font-weight": 500,
    color: colors.text,
    "text-decoration": "none",
    flex: "1 1 auto",
  },
  itemTitleLink: {
    "font-size": text.base,
    "font-weight": 500,
    color: colors.text,
    "text-decoration": "none",
    flex: "1 1 auto",
    transition: "color 0.15s ease",
  },
  badge: {
    "font-size": text.xs,
    "font-weight": 600,
    "letter-spacing": "0.08em",
    "text-transform": "uppercase",
    color: colors.accentDim,
    background: `color-mix(in srgb, ${colors.accent} 10%, transparent)`,
    border: `1px solid ${colors.accentBorder}`,
    "border-radius": radius.sm,
    padding: `2px ${space[2]}`,
    "white-space": "nowrap",
    "flex-shrink": "0",
    "align-self": "center",
  },
  noRecordingBadge: {
    "font-size": text.xs,
    "font-weight": 500,
    "letter-spacing": "0.05em",
    color: colors.textFaint,
    border: `1px solid ${colors.border}`,
    "border-radius": radius.sm,
    padding: `2px ${space[2]}`,
    "white-space": "nowrap",
    "flex-shrink": "0",
    "align-self": "center",
  },
  itemMeta: {
    display: "flex",
    "flex-wrap": "wrap",
    gap: space[3],
    "font-size": text.sm,
    color: colors.textFaint,
    "align-items": "center",
  },
  metaDot: {
    color: colors.border,
  },
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

function AppearanceItem(props: { item: Appearance }) {
  const trackClick = () => {
    analytics.trackEvent("talk_click", {
      title: props.item.title,
      event: props.item.event,
      kind: props.item.kind,
    });
  };

  return (
    <div style={styles.item}>
      <div style={styles.itemTop}>
        {props.item.url ? (
          <a
            href={props.item.url}
            style={styles.itemTitleLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackClick}
          >
            {props.item.title} →
          </a>
        ) : (
          <span style={styles.itemTitle}>{props.item.title}</span>
        )}
        {props.item.isWorkshop && <span style={styles.badge}>Workshop</span>}
        {!props.item.url && <span style={styles.noRecordingBadge}>No public recording</span>}
      </div>
      <div style={styles.itemMeta}>
        <span>{props.item.event}</span>
        <span style={styles.metaDot}>·</span>
        <span>{props.item.location}</span>
        <span style={styles.metaDot}>·</span>
        <span>{props.item.date}</span>
      </div>
    </div>
  );
}

function AppearanceSection(props: { heading: string; items: Appearance[] }) {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionHeading}>{props.heading}</h2>
      <div style={styles.list}>
        <For each={props.items}>{(item) => <AppearanceItem item={item} />}</For>
      </div>
    </div>
  );
}

export default function TalksPage() {
  const trackSpeakingCta = () => {
    analytics.trackEvent("cta_speaking", { location: "talks_page" });
  };

  return (
    <>
      <PageMeta
        title="Talks & Appearances"
        description={`${appearances.length.toString()} conference talks, podcast appearances, and workshops by Dev Agrawal on SolidJS, TanStack, async UI, local-first development, and modern fullstack architecture.`}
        ogImage="/og/talks.svg"
      />
      <div style={pageStyles.page}>
        <p style={pageStyles.eyebrow}>Speaking</p>
        <h1 style={pageStyles.pageHeading}>Talks &amp; Appearances</h1>
        <p style={pageStyles.bodyText}>
          Conference talks, podcast guest spots, and workshops on SolidJS, TanStack, async UI,
          local-first development, and modern fullstack architecture.
        </p>

        <div style={styles.statsRow}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{appearances.length}</span>
            <span style={styles.statLabel}>Total appearances</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{conferences.length}</span>
            <span style={styles.statLabel}>Conf &amp; Workshops</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{podcasts.length}</span>
            <span style={styles.statLabel}>Podcasts</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{meetups.length}</span>
            <span style={styles.statLabel}>Meetups</span>
          </div>
        </div>

        <AppearanceSection heading="Conferences &amp; Workshops" items={conferences} />
        <AppearanceSection heading="Podcasts &amp; Shows" items={podcasts} />
        <AppearanceSection heading="Meetups &amp; Community" items={meetups} />

        <div style={styles.ctaRow}>
          <p style={styles.ctaText}>Interested in having me speak at your conference or podcast?</p>
          <a href={SPEAKING_EMAIL_HREF} style={styles.ctaLink} onClick={trackSpeakingCta}>
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
