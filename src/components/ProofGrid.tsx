import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import type { ProofItem } from "~/data/proof";
import { colors, radius, space, text } from "~/styles/tokens";

const styles: Record<string, JSX.CSSProperties> = {
  grid: {
    display: "grid",
    "grid-template-columns": "repeat(auto-fit, minmax(220px, 1fr))",
    gap: space[4],
  },
  card: {
    display: "flex",
    "flex-direction": "column",
    gap: space[3],
    padding: space[5],
    border: `1px solid ${colors.border}`,
    "border-radius": radius.lg,
    background: "rgba(21, 27, 35, 0.78)",
  },
  compactCard: {
    "min-height": "152px",
  },
  metric: {
    display: "block",
    "font-size": text.lg,
    "font-weight": 760,
    "line-height": 1.1,
    color: colors.textBright,
  },
  label: {
    "font-size": text.base,
    "font-weight": 720,
    color: colors.text,
    "line-height": 1.35,
  },
  description: {
    "font-size": text.sm,
    color: colors.textMuted,
    "line-height": 1.55,
  },
  context: {
    "font-size": text.sm,
    color: colors.textFaint,
    "line-height": 1.5,
  },
  sourceRow: {
    display: "flex",
    "flex-wrap": "wrap",
    gap: space[2],
    "margin-top": "auto",
  },
  sourceLink: {
    "font-size": text.xs,
    "font-weight": 650,
    color: colors.accent,
    "text-decoration": "none",
  },
};

interface ProofGridProps {
  items: ProofItem[];
  variant?: "compact" | "detailed";
  showSources?: boolean;
}

function publicSources(item: ProofItem) {
  return item.sources.filter((source) => source.sourceType === "public" && source.href);
}

export function ProofGrid(props: ProofGridProps) {
  const variant = () => props.variant ?? "compact";

  return (
    <div style={styles.grid}>
      <For each={props.items}>
        {(item) => {
          const sources = () => publicSources(item);

          return (
            <article
              style={{
                ...styles.card,
                ...(variant() === "compact" ? styles.compactCard : {}),
              }}
            >
              <div>
                <Show when={item.metric}>
                  <span style={styles.metric}>{item.metric}</span>
                </Show>
                <h3 style={styles.label}>{item.label}</h3>
              </div>
              <p style={variant() === "compact" ? styles.context : styles.description}>
                {variant() === "compact" ? (item.context ?? item.description) : item.description}
              </p>
              <Show when={props.showSources && sources().length}>
                <div style={styles.sourceRow}>
                  <For each={sources()}>
                    {(source) => (
                      <a
                        href={source.href}
                        style={styles.sourceLink}
                        target={source.href?.startsWith("/") ? undefined : "_blank"}
                        rel={source.href?.startsWith("/") ? undefined : "noopener noreferrer"}
                      >
                        {source.label} →
                      </a>
                    )}
                  </For>
                </div>
              </Show>
            </article>
          );
        }}
      </For>
    </div>
  );
}
