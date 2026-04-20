import { For } from "solid-js";
import type { JSX } from "solid-js";
import { analytics } from "~/config/analytics";
import { PageMeta } from "~/components/PageMeta";
import {
  CONTACT_CHANNELS,
  SOCIAL_PROFILES,
  type ContactChannel,
  type SocialProfile,
} from "~/data/contact";
import { colors, radius, space, text } from "~/styles/tokens";
import { pageStyles } from "~/styles/recipes";

// ─── Page-local styles ────────────────────────────────────────────────────────

const styles: Record<string, JSX.CSSProperties> = {
  // Intent channels
  channelList: {
    display: "flex",
    "flex-direction": "column",
    gap: space[4],
    "margin-bottom": space[14],
  },
  channelCard: {
    padding: space[6],
    border: `1px solid ${colors.border}`,
    "border-radius": radius.lg,
    "background-color": colors.bgElevated,
    display: "flex",
    "flex-direction": "column",
    gap: space[3],
  },
  channelLabel: {
    "font-size": text.md,
    "font-weight": 600,
    color: colors.textBright,
  },
  channelDescription: {
    "font-size": text.base,
    color: colors.textMuted,
    "line-height": 1.6,
    "max-width": "44ch",
  },
  channelLink: {
    display: "inline-block",
    "margin-top": space[1],
    padding: "0.5rem 1.25rem",
    "background-color": colors.accent,
    color: colors.bg,
    "border-radius": radius.md,
    "font-weight": 600,
    "font-size": text.sm,
    "text-decoration": "none",
    "align-self": "flex-start",
  },

  // Social section
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
  socialList: {
    display: "flex",
    "flex-direction": "column",
    gap: "0",
  },
  socialItem: {
    display: "flex",
    "align-items": "center",
    gap: space[4],
    padding: `${space[4]} 0`,
    "border-bottom": `1px solid ${colors.border}`,
  },
  socialLabel: {
    "font-size": text.base,
    "font-weight": 600,
    color: colors.textBright,
    width: "7rem",
    "flex-shrink": 0,
  },
  socialLink: {
    "font-size": text.base,
    color: colors.accent,
    "text-decoration": "none",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChannelCard(props: { channel: ContactChannel }) {
  const trackClick = () => {
    analytics.trackEvent(props.channel.analyticsEvent, props.channel.analyticsProps);
  };

  return (
    <div style={styles.channelCard}>
      <p style={styles.channelLabel}>{props.channel.label}</p>
      <p style={styles.channelDescription}>{props.channel.description}</p>
      <a href={props.channel.href} style={styles.channelLink} onClick={trackClick}>
        {props.channel.label} →
      </a>
    </div>
  );
}

function SocialRow(props: { profile: SocialProfile }) {
  const trackClick = () => {
    analytics.trackEvent("social_click", props.profile.analyticsProps);
  };

  return (
    <div style={styles.socialItem}>
      <span style={styles.socialLabel}>{props.profile.label}</span>
      <a
        href={props.profile.url}
        style={styles.socialLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackClick}
      >
        {props.profile.handle}
      </a>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact"
        description="Reach out to Dev Agrawal for speaking invitations, collaboration, or DevRel work."
      />
      <div style={pageStyles.page}>
        <p style={pageStyles.eyebrow}>Get in touch</p>
        <h1 style={pageStyles.pageHeading}>Contact</h1>
        <p style={pageStyles.bodyText}>
          I'm open to speaking invitations, technical collaboration, and conversations about async
          UI, local-first architecture, and the Solid and TanStack ecosystems. Pick the path that
          fits.
        </p>

        <div style={styles.channelList}>
          <For each={CONTACT_CHANNELS}>{(channel) => <ChannelCard channel={channel} />}</For>
        </div>

        <p style={styles.sectionHeading}>Find me online</p>
        <div style={styles.socialList}>
          <For each={SOCIAL_PROFILES}>{(profile) => <SocialRow profile={profile} />}</For>
        </div>
      </div>
    </>
  );
}
