// Shared style patterns composed from design tokens.
// Routes import from here instead of duplicating the same style objects.

import type { JSX } from "solid-js";
import { colors, layout, radius, space, text } from "./tokens";

// Standard page layout: eyebrow label → page heading → body text → content.
// Used by all top-level route pages.
export const pageStyles: Record<string, JSX.CSSProperties> = {
  page: {
    "max-width": layout.contentWidth,
    margin: "0 auto",
    padding: `${space[16]} ${layout.contentPad}`,
  },
  eyebrow: {
    "font-size": text.xs,
    "font-weight": 600,
    "letter-spacing": "0.12em",
    "text-transform": "uppercase",
    color: colors.accent,
    "margin-bottom": space[4],
  },
  pageHeading: {
    "font-size": text.pageHeading,
    "font-weight": 700,
    color: colors.textBright,
    "margin-bottom": space[4],
    "letter-spacing": "-0.03em",
  },
  bodyText: {
    color: colors.textMuted,
    "font-size": text.md,
    "line-height": 1.7,
    "max-width": layout.contentNarrow,
    "margin-bottom": space[12],
  },
  scaffoldNote: {
    padding: space[8],
    border: `1px dashed ${colors.border}`,
    "border-radius": radius.lg,
    color: colors.textFaint,
    "font-size": text.sm,
    "line-height": 1.6,
  },
};
