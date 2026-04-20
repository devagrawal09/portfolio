// Design system tokens.
// All CSS values reference custom properties declared in global.css :root.
// Import these instead of hardcoding raw values in component style objects.

// ─── Colors ───────────────────────────────────────────────────────────────────
export const colors = {
  bg: "var(--color-bg)",
  bgElevated: "var(--color-bg-elevated)",
  bgSubtle: "var(--color-bg-subtle)",
  border: "var(--color-border)",
  text: "var(--color-text)",
  textMuted: "var(--color-text-muted)",
  textFaint: "var(--color-text-faint)",
  textBright: "var(--color-text-bright)",
  accent: "var(--color-accent)",
  accentDim: "var(--color-accent-dim)",
  accentBorder: "var(--color-accent-border)",
} as const;

// ─── Spacing (4px base unit) ──────────────────────────────────────────────────
export const space = {
  1: "var(--space-1)", //  0.25rem
  2: "var(--space-2)", //  0.5rem
  3: "var(--space-3)", //  0.75rem
  4: "var(--space-4)", //  1rem
  5: "var(--space-5)", //  1.25rem
  6: "var(--space-6)", //  1.5rem
  8: "var(--space-8)", //  2rem
  10: "var(--space-10)", // 2.5rem
  12: "var(--space-12)", // 3rem
  14: "var(--space-14)", // 3.5rem
  16: "var(--space-16)", // 4rem
  20: "var(--space-20)", // 5rem
} as const;

// ─── Typography — font size scale ─────────────────────────────────────────────
export const text = {
  xs: "var(--text-xs)", //  0.75rem  — eyebrows, labels
  sm: "var(--text-sm)", //  0.875rem — nav links, secondary text
  base: "var(--text-base)", //  0.95rem  — list items, small body
  md: "var(--text-md)", //  1.05rem  — body / descriptions
  lg: "var(--text-lg)", //  1.125rem — subheadings
  hero: "var(--text-hero)", //  clamp(2rem, 5vw, 3.25rem)
  pageHeading: "var(--text-page-heading)", // clamp(1.75rem, 4vw, 2.5rem)
} as const;

// ─── Border radius ────────────────────────────────────────────────────────────
export const radius = {
  sm: "var(--radius-sm)", // 4px
  md: "var(--radius-md)", // 6px
  lg: "var(--radius-lg)", // 8px
} as const;

// ─── Layout constants ─────────────────────────────────────────────────────────
export const layout = {
  contentWidth: "var(--layout-content-width)", //  780px
  contentNarrow: "var(--layout-content-narrow)", // 560px — prose max-width
  contentPad: "var(--layout-content-pad)", //  2rem  — horizontal page padding
} as const;
