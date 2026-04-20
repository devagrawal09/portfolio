import { For } from "solid-js";
import type { JSX } from "solid-js";
import { analytics } from "~/config/analytics";
import { PageMeta } from "~/components/PageMeta";
import { CONTACT_EMAIL_HREF } from "~/data/contact";
import { COMMUNITY_ROLES, EDUCATION, OSS_CONTRIBUTIONS, WORK_ROLES } from "~/data/profile";
import type { CommunityRole, EducationEntry, OssContribution, WorkRole } from "~/data/profile";
import { colors, radius, space, text } from "~/styles/tokens";
import { pageStyles } from "~/styles/recipes";

// ─── Page-local styles ────────────────────────────────────────────────────────

const styles: Record<string, JSX.CSSProperties> = {
  // Section chrome
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

  // Work roles
  roleItem: {
    padding: `${space[6]} 0`,
    "border-bottom": `1px solid ${colors.border}`,
  },
  roleHeader: {
    display: "flex",
    "flex-wrap": "wrap",
    gap: space[3],
    "align-items": "baseline",
    "margin-bottom": space[3],
  },
  roleTitle: {
    "font-size": text.md,
    "font-weight": 600,
    color: colors.textBright,
    flex: "1 1 auto",
  },
  roleCompany: {
    "font-size": text.base,
    "font-weight": 500,
    color: colors.accent,
  },
  rolePeriod: {
    "font-size": text.sm,
    color: colors.textFaint,
    "white-space": "nowrap",
  },
  roleBullets: {
    "margin-bottom": space[3],
    display: "flex",
    "flex-direction": "column",
    gap: space[2],
    "padding-left": space[4],
  },
  roleBullet: {
    "font-size": text.base,
    color: colors.textMuted,
    "line-height": 1.6,
    "list-style": "disc",
  },
  techRow: {
    display: "flex",
    "flex-wrap": "wrap",
    gap: space[2],
    "margin-top": space[2],
  },
  techBadge: {
    "font-size": text.xs,
    "font-weight": 500,
    color: colors.textFaint,
    background: colors.bgSubtle,
    border: `1px solid ${colors.border}`,
    "border-radius": radius.sm,
    padding: `2px ${space[2]}`,
  },

  // OSS contributions
  ossItem: {
    display: "flex",
    "flex-direction": "column",
    gap: space[1],
    padding: `${space[5]} 0`,
    "border-bottom": `1px solid ${colors.border}`,
  },
  ossTop: {
    display: "flex",
    gap: space[3],
    "align-items": "center",
    "flex-wrap": "wrap",
  },
  ossName: {
    "font-size": text.base,
    "font-weight": 600,
    color: colors.text,
    "text-decoration": "none",
    transition: "color 0.15s ease",
  },
  ossBadge: {
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
  },
  ossSince: {
    "font-size": text.xs,
    color: colors.textFaint,
    "margin-left": "auto",
  },
  ossDescription: {
    "font-size": text.sm,
    color: colors.textMuted,
    "line-height": 1.6,
  },

  // Community
  communityItem: {
    display: "flex",
    "flex-direction": "column",
    gap: space[1],
    padding: `${space[5]} 0`,
    "border-bottom": `1px solid ${colors.border}`,
  },
  communityTop: {
    display: "flex",
    gap: space[3],
    "align-items": "baseline",
    "flex-wrap": "wrap",
  },
  communityOrg: {
    "font-size": text.base,
    "font-weight": 600,
    color: colors.text,
    flex: "1 1 auto",
  },
  communityRole: {
    "font-size": text.sm,
    "font-weight": 500,
    color: colors.accent,
  },
  communityPeriod: {
    "font-size": text.sm,
    color: colors.textFaint,
    "white-space": "nowrap",
  },
  communityDescription: {
    "font-size": text.sm,
    color: colors.textMuted,
    "line-height": 1.6,
  },

  // Education
  educationBlock: {
    padding: `${space[5]} 0`,
  },
  educationDegree: {
    "font-size": text.md,
    "font-weight": 600,
    color: colors.textBright,
    "margin-bottom": space[1],
  },
  educationSchool: {
    "font-size": text.base,
    color: colors.accent,
    "margin-bottom": space[2],
  },
  educationPeriod: {
    "font-size": text.sm,
    color: colors.textFaint,
    "margin-bottom": space[3],
  },
  educationNotes: {
    display: "flex",
    gap: space[4],
    "flex-wrap": "wrap",
  },
  educationNote: {
    "font-size": text.sm,
    color: colors.textMuted,
    background: colors.bgSubtle,
    border: `1px solid ${colors.border}`,
    "border-radius": radius.sm,
    padding: `2px ${space[3]}`,
  },

  // CTA row
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function RoleItem(props: { role: WorkRole }) {
  return (
    <div style={styles.roleItem}>
      <div style={styles.roleHeader}>
        <span style={styles.roleTitle}>{props.role.title}</span>
        <span style={styles.roleCompany}>{props.role.company}</span>
        <span style={styles.rolePeriod}>{props.role.period}</span>
      </div>
      <ul style={styles.roleBullets}>
        <For each={props.role.highlights}>{(h) => <li style={styles.roleBullet}>{h}</li>}</For>
      </ul>
      {props.role.tech.length > 0 && (
        <div style={styles.techRow}>
          <For each={props.role.tech}>{(t) => <span style={styles.techBadge}>{t}</span>}</For>
        </div>
      )}
    </div>
  );
}

function OssItem(props: { item: OssContribution }) {
  const trackClick = () =>
    analytics.trackEvent("oss_click", { name: props.item.name, role: props.item.role });
  return (
    <div style={styles.ossItem}>
      <div style={styles.ossTop}>
        <a
          href={props.item.url}
          style={styles.ossName}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackClick}
        >
          {props.item.name} →
        </a>
        <span style={styles.ossBadge}>{props.item.role}</span>
        <span style={styles.ossSince}>since {props.item.since}</span>
      </div>
      <p style={styles.ossDescription}>{props.item.description}</p>
    </div>
  );
}

function CommunityItem(props: { item: CommunityRole }) {
  return (
    <div style={styles.communityItem}>
      <div style={styles.communityTop}>
        <span style={styles.communityOrg}>{props.item.org}</span>
        <span style={styles.communityRole}>{props.item.role}</span>
        <span style={styles.communityPeriod}>{props.item.period}</span>
      </div>
      <p style={styles.communityDescription}>{props.item.description}</p>
    </div>
  );
}

function EducationBlock(props: { edu: EducationEntry }) {
  return (
    <div style={styles.educationBlock}>
      <p style={styles.educationDegree}>{props.edu.degree}</p>
      <p style={styles.educationSchool}>{props.edu.school}</p>
      <p style={styles.educationPeriod}>{props.edu.period}</p>
      <div style={styles.educationNotes}>
        <For each={props.edu.notes}>{(n) => <span style={styles.educationNote}>{n}</span>}</For>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const trackContact = () => analytics.trackEvent("cta_contact", { location: "about_page" });

  return (
    <>
      <PageMeta
        title="About"
        description="Dev Agrawal — DevRel engineer, Solid.js core team member, TanStack Start maintainer, and conference speaker on modern fullstack development."
        ogImage="/og/about.svg"
      />
      <div style={pageStyles.page}>
        <p style={pageStyles.eyebrow}>Background</p>
        <h1 style={pageStyles.pageHeading}>About Dev</h1>
        <p style={pageStyles.bodyText}>
          I'm a software engineer and developer advocate focused on fullstack architecture, reactive
          UI, and local-first systems. I contribute to the Solid.js core, maintain TanStack Start,
          and speak at conferences on async UI, sync engines, and modern web patterns. Currently
          building at Xolvio while staying active in the OSS ecosystem.
        </p>

        {/* Work experience */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Work experience</h2>
          <div style={styles.list}>
            <For each={WORK_ROLES}>{(role) => <RoleItem role={role} />}</For>
          </div>
        </div>

        {/* Open source */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Open source</h2>
          <div style={styles.list}>
            <For each={OSS_CONTRIBUTIONS}>{(item) => <OssItem item={item} />}</For>
          </div>
        </div>

        {/* Community */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Community</h2>
          <div style={styles.list}>
            <For each={COMMUNITY_ROLES}>{(item) => <CommunityItem item={item} />}</For>
          </div>
        </div>

        {/* Education */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Education</h2>
          <EducationBlock edu={EDUCATION} />
        </div>

        {/* CTA */}
        <div style={styles.ctaRow}>
          <p style={styles.ctaText}>Want to collaborate, speak together, or just say hi?</p>
          <a href={CONTACT_EMAIL_HREF} style={styles.ctaLink} onClick={trackContact}>
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
