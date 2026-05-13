import type { JSX } from "solid-js";
import type { ProofItem } from "~/data/proof";
import { colors, radius, space, text } from "~/styles/tokens";

const styles: Record<string, JSX.CSSProperties> = {
  badge: {
    display: "inline-flex",
    "align-items": "center",
    gap: space[2],
    border: `1px solid ${colors.accentBorder}`,
    "border-radius": radius.sm,
    background: colors.accentDim,
    color: colors.accent,
    padding: `0.18rem ${space[2]}`,
    "font-size": text.xs,
    "font-weight": 700,
    "line-height": 1.3,
  },
  metric: {
    color: colors.textBright,
  },
};

interface ProofBadgeProps {
  item: ProofItem;
}

export function ProofBadge(props: ProofBadgeProps) {
  return (
    <span style={styles.badge}>
      {props.item.metric && <strong style={styles.metric}>{props.item.metric}</strong>}
      <span>{props.item.label}</span>
    </span>
  );
}
