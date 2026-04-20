import { For } from "solid-js";
import type { JSX } from "solid-js";
import { A } from "@solidjs/router";
import { analytics } from "~/config/analytics";
import { PageMeta } from "~/components/PageMeta";
import { colors, layout, radius, space, text } from "~/styles/tokens";
import { appearances } from "~/data/talks";
import { homepageFeatured, type FeaturedProject } from "~/data/projects";
import { featuredArticles, type Article } from "~/data/writing";
import {
  FOOTER_CTAS,
  HERO,
  NOW_ITEMS,
  OSS_ITEMS,
  PROOF_STATS,
  type FooterCta,
  type HeroCta,
  type OssItem,
  type ProofStat,
} from "~/data/home";

// Top 3 conference appearances with a recording URL, newest-first.
const featuredTalks = appearances.filter((a) => a.kind === "conference" && a.url).slice(0, 3);

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Record<string, JSX.CSSProperties> = {
  // ── Hero ──
  hero: {
    "max-width": layout.contentWidth,
    margin: "0 auto",
    padding: "5rem 2rem 4rem",
  },
  heroName: {
    display: "block",
    "font-size": text.lg,
    "font-weight": "700",
    color: colors.accent,
    "letter-spacing": "-0.01em",
    "margin-bottom": space[3],
  },
  eyebrow: {
    "font-size": text.xs,
    "font-weight": "600",
    "letter-spacing": "0.12em",
    "text-transform": "uppercase",
    color: colors.textFaint,
    "margin-bottom": space[5],
  },
  headline: {
    "font-size": text.hero,
    "font-weight": "700",
    "line-height": "1.15",
    "letter-spacing": "-0.02em",
    color: colors.textBright,
    "margin-bottom": space[5],
  },
  subline: {
    "font-size": text.lg,
    color: colors.textMuted,
    "max-width": layout.contentNarrow,
    "margin-bottom": space[8],
    "line-height": "1.7",
  },
  ctaRow: {
    display: "flex",
    gap: space[4],
    "flex-wrap": "wrap",
  },
  ctaPrimary: {
    display: "inline-block",
    padding: "0.625rem 1.5rem",
    "background-color": colors.accent,
    color: colors.bg,
    "border-radius": radius.md,
    "font-weight": "600",
    "font-size": "0.9rem",
  },
  ctaSecondary: {
    display: "inline-block",
    padding: "0.625rem 1.5rem",
    border: `1px solid ${colors.border}`,
    color: colors.textMuted,
    "border-radius": radius.md,
    "font-size": "0.9rem",
  },

  // ── Proof bar ──
  proofBar: {
    display: "flex",
    "flex-wrap": "wrap",
    "border-top": `1px solid ${colors.border}`,
    "border-bottom": `1px solid ${colors.border}`,
    "max-width": layout.contentWidth,
    margin: "0 auto",
  },
  proofItem: {
    flex: "1 1 160px",
    padding: `${space[5]} ${space[8]}`,
    "border-right": `1px solid ${colors.border}`,
  },
  proofStat: {
    display: "block",
    "font-size": text.lg,
    "font-weight": "700",
    color: colors.textBright,
    "margin-bottom": "0.15rem",
    "letter-spacing": "-0.01em",
  },
  proofLabel: {
    display: "block",
    "font-size": text.xs,
    color: colors.textFaint,
    "letter-spacing": "0.02em",
  },

  // ── Section scaffold ──
  section: {
    "max-width": layout.contentWidth,
    margin: "0 auto",
    padding: `${space[14]} ${space[8]}`,
    "border-bottom": `1px solid ${colors.border}`,
  },
  sectionHeader: {
    display: "flex",
    "align-items": "baseline",
    "justify-content": "space-between",
    "margin-bottom": space[8],
    "flex-wrap": "wrap",
    gap: space[3],
  },
  sectionLabel: {
    "font-size": text.xs,
    "font-weight": "600",
    "letter-spacing": "0.12em",
    "text-transform": "uppercase",
    color: colors.textFaint,
  },
  sectionLink: {
    "font-size": text.sm,
    color: colors.accent,
  },

  // ── Featured talks ──
  talkList: {
    display: "flex",
    "flex-direction": "column",
    gap: space[4],
  },
  talkItem: {
    padding: `${space[5]} ${space[6]}`,
    "background-color": colors.bgElevated,
    "border-radius": radius.lg,
    border: `1px solid ${colors.border}`,
    display: "flex",
    "align-items": "center",
    "justify-content": "space-between",
    gap: space[4],
    "flex-wrap": "wrap",
  },
  talkTitle: {
    "font-size": text.base,
    "font-weight": "600",
    color: colors.text,
    "margin-bottom": "0.2rem",
  },
  talkMeta: {
    "font-size": text.xs,
    color: colors.textFaint,
  },
  talkArrow: {
    "font-size": text.sm,
    color: colors.accent,
    "flex-shrink": "0",
  },

  // ── OSS section ──
  ossList: {
    display: "flex",
    "flex-direction": "column",
    gap: space[3],
  },
  ossItem: {
    display: "flex",
    "align-items": "center",
    gap: space[4],
    padding: `${space[4]} 0`,
    "border-bottom": `1px solid ${colors.border}`,
  },
  ossName: {
    "font-size": text.base,
    "font-weight": "600",
    color: colors.textBright,
    "min-width": "130px",
  },
  ossRole: {
    "font-size": text.xs,
    "font-weight": "600",
    color: colors.accent,
    "background-color": colors.accentDim,
    border: `1px solid ${colors.accentBorder}`,
    "border-radius": radius.sm,
    padding: "0.15rem 0.5rem",
    "letter-spacing": "0.04em",
    "text-transform": "uppercase",
  },
  ossSince: {
    "font-size": text.xs,
    color: colors.textFaint,
    "margin-left": "auto",
  },

  // ── Featured work cards ──
  workGrid: {
    display: "flex",
    "flex-direction": "column",
    gap: space[4],
  },
  workCard: {
    padding: `${space[6]} ${space[6]}`,
    "background-color": colors.bgElevated,
    "border-radius": radius.lg,
    border: `1px solid ${colors.border}`,
  },
  workCardHeader: {
    display: "flex",
    "align-items": "flex-start",
    "justify-content": "space-between",
    gap: space[4],
    "flex-wrap": "wrap",
    "margin-bottom": space[3],
  },
  workCardTitle: {
    "font-size": text.base,
    "font-weight": "700",
    color: colors.textBright,
  },
  workCardMeta: {
    "font-size": text.xs,
    color: colors.textFaint,
    "white-space": "nowrap",
  },
  workCardTagline: {
    "font-size": text.sm,
    color: colors.textMuted,
    "line-height": "1.6",
    "margin-bottom": space[4],
  },
  workCardTags: {
    display: "flex",
    "flex-wrap": "wrap",
    gap: space[2],
  },
  workCardTag: {
    "font-size": "0.7rem",
    "font-weight": "600",
    "letter-spacing": "0.06em",
    "text-transform": "uppercase",
    color: colors.textFaint,
    "background-color": colors.bgSubtle,
    border: `1px solid ${colors.border}`,
    "border-radius": radius.sm,
    padding: "0.15rem 0.5rem",
  },
  workCardCaseStudyLink: {
    "font-size": text.xs,
    color: colors.accent,
    "font-weight": "600",
    "flex-shrink": "0",
    "align-self": "flex-start",
    "margin-top": space[1],
  },
  workCardLink: {
    "font-size": text.xs,
    color: colors.textFaint,
    "flex-shrink": "0",
    "align-self": "flex-start",
    "margin-top": space[1],
  },

  // ── Writing highlights ──
  writingItem: {
    padding: `${space[5]} ${space[6]}`,
    "background-color": colors.bgElevated,
    "border-radius": radius.lg,
    border: `1px solid ${colors.border}`,
    display: "flex",
    "align-items": "center",
    "justify-content": "space-between",
    gap: space[4],
    "flex-wrap": "wrap",
  },
  writingTitle: {
    "font-size": text.base,
    "font-weight": "600",
    color: colors.text,
    "margin-bottom": "0.2rem",
  },
  writingMeta: {
    "font-size": text.xs,
    color: colors.textFaint,
  },
  writingArrow: {
    "font-size": text.sm,
    color: colors.accent,
    "flex-shrink": "0",
  },

  // ── Now section ──
  nowList: {
    "list-style": "none",
    display: "flex",
    "flex-direction": "column",
    gap: space[3],
    color: colors.textMuted,
    "font-size": text.base,
    "line-height": "1.7",
  },
  nowItem: {
    display: "flex",
    gap: space[3],
    "align-items": "flex-start",
  },
  nowDot: {
    "font-size": "0.5rem",
    color: colors.accent,
    "padding-top": "0.45em",
    "flex-shrink": "0",
  },

  // ── CTA footer ──
  ctaFooter: {
    "max-width": layout.contentWidth,
    margin: "0 auto",
    padding: `${space[14]} ${space[8]}`,
    display: "flex",
    gap: space[6],
    "flex-wrap": "wrap",
  },
  ctaCard: {
    flex: "1 1 260px",
    padding: space[8],
    "border-radius": radius.lg,
    border: `1px solid ${colors.border}`,
    display: "flex",
    "flex-direction": "column",
    gap: space[3],
  },
  ctaCardLabel: {
    "font-size": text.base,
    "font-weight": "700",
    color: colors.textBright,
  },
  ctaCardDesc: {
    "font-size": text.sm,
    color: colors.textMuted,
    "line-height": "1.6",
    flex: "1",
  },
  ctaCardPrimary: {
    display: "inline-block",
    "margin-top": space[2],
    padding: "0.5rem 1.25rem",
    "background-color": colors.accent,
    color: colors.bg,
    "border-radius": radius.md,
    "font-weight": "600",
    "font-size": text.sm,
    "align-self": "flex-start",
  },
  ctaCardSecondary: {
    display: "inline-block",
    "margin-top": space[2],
    padding: "0.5rem 1.25rem",
    border: `1px solid ${colors.border}`,
    color: colors.textMuted,
    "border-radius": radius.md,
    "font-size": text.sm,
    "align-self": "flex-start",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProofItem(props: { item: ProofStat; isLast: boolean }) {
  const style = (): JSX.CSSProperties =>
    props.isLast ? { ...s.proofItem, "border-right": "none" } : s.proofItem;
  return (
    <div class="proof-item" style={style()}>
      <span style={s.proofStat}>{props.item.stat}</span>
      <span style={s.proofLabel}>{props.item.label}</span>
    </div>
  );
}

function OssRow(props: { item: OssItem; isLast: boolean }) {
  const style = (): JSX.CSSProperties =>
    props.isLast ? { ...s.ossItem, "border-bottom": "none" } : s.ossItem;
  return (
    <a href={props.item.url} style={style()} target="_blank" rel="noopener noreferrer">
      <span style={s.ossName}>{props.item.name}</span>
      <span style={s.ossRole}>{props.item.role}</span>
      <span style={s.ossSince}>{props.item.since} →</span>
    </a>
  );
}

function WorkCard(props: {
  project: FeaturedProject;
  onNavigate: () => void;
  onCaseStudy: () => void;
}) {
  return (
    <div style={s.workCard}>
      <div style={s.workCardHeader}>
        <span style={s.workCardTitle}>{props.project.title}</span>
        <span style={s.workCardMeta}>
          {props.project.role} · {props.project.period}
        </span>
      </div>
      <p style={s.workCardTagline}>{props.project.tagline}</p>
      <div
        style={{
          display: "flex",
          "align-items": "flex-end",
          "justify-content": "space-between",
          gap: space[4],
          "flex-wrap": "wrap",
        }}
      >
        <div style={s.workCardTags}>
          <For each={props.project.tech}>{(tag) => <span style={s.workCardTag}>{tag}</span>}</For>
        </div>
        <div style={{ display: "flex", gap: space[4], "align-items": "center" }}>
          {props.project.caseStudyPath && (
            <A
              href={props.project.caseStudyPath}
              style={s.workCardCaseStudyLink}
              onClick={props.onCaseStudy}
            >
              Case study →
            </A>
          )}
          {(props.project.url ?? props.project.repoUrl) && (
            <a
              href={props.project.url ?? props.project.repoUrl}
              style={s.workCardLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={props.onNavigate}
            >
              View ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function WritingCard(props: { article: Article; onNavigate: () => void }) {
  return (
    <div style={s.writingItem}>
      <div>
        <div style={s.writingTitle}>{props.article.title}</div>
        <div style={s.writingMeta}>
          {props.article.displayDate} · {props.article.tags.join(" · ")}
        </div>
      </div>
      <A
        href="/writing"
        style={s.writingArrow}
        onClick={props.onNavigate}
        aria-label={`Read ${props.article.title}`}
      >
        →
      </A>
    </div>
  );
}

function CtaCard(props: { cta: FooterCta }) {
  const trackClick = () =>
    analytics.trackEvent(props.cta.analyticsEvent, { location: "home_footer" });
  const buttonStyle = (): JSX.CSSProperties =>
    props.cta.variant === "primary" ? s.ctaCardPrimary : s.ctaCardSecondary;
  return (
    <div style={s.ctaCard}>
      <span style={s.ctaCardLabel}>{props.cta.label}</span>
      <span style={s.ctaCardDesc}>{props.cta.description}</span>
      <a href={props.cta.href} style={buttonStyle()} onClick={trackClick}>
        {props.cta.label} →
      </a>
    </div>
  );
}

// ─── Route ────────────────────────────────────────────────────────────────────

export default function Home() {
  const trackHeroCta = (event: HeroCta["analyticsEvent"]) => () =>
    analytics.trackEvent(event, { location: "home_hero" });
  const trackWorkClick = (slug: string) => () =>
    analytics.trackEvent("featured_work_click", { slug, location: "home_featured" });
  const trackCaseStudyClick = (slug: string) => () =>
    analytics.trackEvent("case_study_click", { slug, location: "home_featured" });
  const trackTalkClick = (title: string) => () =>
    analytics.trackEvent("talk_click", { title, location: "home_featured" });
  const trackWritingClick = (slug: string) => () =>
    analytics.trackEvent("writing_click", { slug, location: "home_featured" });

  return (
    <>
      <PageMeta
        title="DevRel Engineer & Fullstack Builder"
        description="Dev Agrawal — DevRel engineer shipping fullstack demos, technical content, and open source work in the Solid and TanStack ecosystems."
        ogImage="/og.svg"
      />

      {/* ── Hero ── */}
      <section style={s.hero}>
        <span style={s.heroName}>{HERO.name}</span>
        <p style={s.eyebrow}>{HERO.eyebrow}</p>
        <h1 style={s.headline}>{HERO.headline}</h1>
        <p style={s.subline}>{HERO.subline}</p>
        <div style={s.ctaRow}>
          <For each={HERO.ctas}>
            {(cta) => (
              <A
                href={cta.href}
                style={cta.variant === "primary" ? s.ctaPrimary : s.ctaSecondary}
                onClick={trackHeroCta(cta.analyticsEvent)}
              >
                {cta.label} →
              </A>
            )}
          </For>
        </div>
      </section>

      {/* ── Proof bar ── */}
      <div style={s.proofBar}>
        <For each={PROOF_STATS}>
          {(item, i) => <ProofItem item={item} isLast={i() === PROOF_STATS.length - 1} />}
        </For>
      </div>

      {/* ── Featured work ── */}
      <section style={s.section}>
        <div style={s.sectionHeader}>
          <h2 style={s.sectionLabel}>Featured Work</h2>
          <A href="/work" style={s.sectionLink}>
            All projects →
          </A>
        </div>
        <div style={s.workGrid}>
          <For each={homepageFeatured}>
            {(project) => (
              <WorkCard
                project={project}
                onNavigate={trackWorkClick(project.slug)}
                onCaseStudy={trackCaseStudyClick(project.slug)}
              />
            )}
          </For>
        </div>
      </section>

      {/* ── Featured talks ── */}
      <section style={s.section}>
        <div style={s.sectionHeader}>
          <h2 style={s.sectionLabel}>Featured Talks</h2>
          <A href="/talks" style={s.sectionLink}>
            All {appearances.length} appearances →
          </A>
        </div>
        <div style={s.talkList}>
          <For each={featuredTalks}>
            {(talk) => (
              <a
                href={talk.url}
                style={s.talkItem}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackTalkClick(talk.title)}
              >
                <div>
                  <div style={s.talkTitle}>{talk.title}</div>
                  <div style={s.talkMeta}>
                    {talk.event} · {talk.location} · {talk.date}
                  </div>
                </div>
                <span style={s.talkArrow}>↗</span>
              </a>
            )}
          </For>
        </div>
      </section>

      {/* ── OSS & ecosystem ── */}
      <section style={s.section}>
        <div style={s.sectionHeader}>
          <h2 style={s.sectionLabel}>Open Source</h2>
          <A href="/open-source" style={s.sectionLink}>
            More →
          </A>
        </div>
        <div style={s.ossList}>
          <For each={OSS_ITEMS}>
            {(item, i) => <OssRow item={item} isLast={i() === OSS_ITEMS.length - 1} />}
          </For>
        </div>
      </section>

      {/* ── Writing highlights ── */}
      <section style={s.section}>
        <div style={s.sectionHeader}>
          <h2 style={s.sectionLabel}>Writing</h2>
          <A href="/writing" style={s.sectionLink}>
            All articles →
          </A>
        </div>
        <div style={s.talkList}>
          <For each={featuredArticles}>
            {(article) => (
              <WritingCard article={article} onNavigate={trackWritingClick(article.slug)} />
            )}
          </For>
        </div>
      </section>

      {/* ── Now ── */}
      <section style={{ ...s.section, "border-bottom": "none" }}>
        <div style={s.sectionHeader}>
          <h2 style={s.sectionLabel}>Currently</h2>
        </div>
        <ul style={s.nowList}>
          <For each={NOW_ITEMS}>
            {(item) => (
              <li style={s.nowItem}>
                <span style={s.nowDot}>●</span>
                <span>{item}</span>
              </li>
            )}
          </For>
        </ul>
      </section>

      {/* ── CTA footer ── */}
      <div style={{ "border-top": `1px solid ${colors.border}` }}>
        <div style={s.ctaFooter}>
          <For each={FOOTER_CTAS}>{(cta) => <CtaCard cta={cta} />}</For>
        </div>
      </div>
    </>
  );
}
