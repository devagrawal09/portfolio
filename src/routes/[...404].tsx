import { For } from "solid-js";
import type { JSX } from "solid-js";
import { A } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { PageMeta } from "~/components/PageMeta";
import { NAV_LINKS } from "~/config/site";
import { analytics } from "~/config/analytics";
import { colors, radius, space, text } from "~/styles/tokens";
import { pageStyles } from "~/styles/recipes";

// ─── Page-local styles ────────────────────────────────────────────────────────

const styles: Record<string, JSX.CSSProperties> = {
  homeCta: {
    display: "inline-block",
    padding: "0.5rem 1.25rem",
    "background-color": colors.accent,
    color: colors.bg,
    "border-radius": radius.md,
    "font-weight": 600,
    "font-size": text.sm,
    "text-decoration": "none",
  },
  navGrid: {
    display: "grid",
    "grid-template-columns": "repeat(auto-fill, minmax(9rem, 1fr))",
    gap: space[3],
    "margin-top": space[10],
  },
  navLink: {
    display: "block",
    padding: `${space[4]} ${space[5]}`,
    border: `1px solid ${colors.border}`,
    "border-radius": radius.md,
    color: colors.textBright,
    "background-color": colors.bgElevated,
    "text-decoration": "none",
    "font-size": text.sm,
    "font-weight": 600,
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotFound() {
  return (
    <>
      <HttpStatusCode code={404} />
      <PageMeta
        title="Page not found"
        description="The page you're looking for doesn't exist on this site."
        noIndex
      />
      <div style={pageStyles.page}>
        <p style={pageStyles.eyebrow}>404 — Page not found</p>
        <h1 style={pageStyles.pageHeading}>Nothing here.</h1>
        <p style={pageStyles.bodyText}>
          That URL doesn't match any page on the site. Head back somewhere useful.
        </p>

        <A href="/" style={styles.homeCta}>
          Go home →
        </A>

        <div style={styles.navGrid}>
          <For each={NAV_LINKS}>
            {(link) => (
              <A
                href={link.href}
                style={styles.navLink}
                onClick={() => analytics.trackEvent("not_found_nav", { destination: link.href })}
              >
                {link.label}
              </A>
            )}
          </For>
        </div>
      </div>
    </>
  );
}
