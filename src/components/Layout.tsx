import { A, useLocation } from "@solidjs/router";
import type { JSX, ParentProps } from "solid-js";
import { For } from "solid-js";
import { NAV_LINKS, SITE } from "~/config/site";
import { colors, layout, space, text } from "~/styles/tokens";

const styles = {
  root: {
    display: "flex",
    "flex-direction": "column",
    "min-height": "100dvh",
  } satisfies JSX.CSSProperties,

  nav: {
    padding: `${space[5]} ${space[8]}`,
    "border-bottom": `1px solid ${colors.border}`,
    position: "sticky",
    top: "0",
    "background-color": colors.bg,
    "z-index": "10",
  } satisfies JSX.CSSProperties,

  navInner: {
    "max-width": layout.contentWidth,
    margin: "0 auto",
    width: "100%",
    display: "flex",
    "align-items": "center",
    "justify-content": "space-between",
  } satisfies JSX.CSSProperties,

  brand: {
    color: colors.accent,
    "font-weight": 700,
    "font-size": "1.1rem",
    "letter-spacing": "-0.02em",
  } satisfies JSX.CSSProperties,

  navLinks: {
    display: "flex",
    gap: space[6],
    "align-items": "center",
  } satisfies JSX.CSSProperties,

  navLink: {
    "font-size": text.sm,
    "font-weight": 500,
    transition: "color 0.15s",
  } satisfies JSX.CSSProperties,

  main: {
    flex: "1",
  } satisfies JSX.CSSProperties,

  footer: {
    padding: space[8],
    "border-top": `1px solid ${colors.border}`,
  } satisfies JSX.CSSProperties,

  footerInner: {
    "max-width": layout.contentWidth,
    margin: "0 auto",
    width: "100%",
    display: "flex",
    "align-items": "center",
    "justify-content": "space-between",
    color: colors.textFaint,
    "font-size": "0.8rem",
  } satisfies JSX.CSSProperties,
} as const;

export function Layout(props: ParentProps) {
  const location = useLocation();

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);

  const linkStyle = (href: string): JSX.CSSProperties => ({
    ...styles.navLink,
    color: isActive(href) ? colors.accent : colors.textMuted,
  });

  return (
    <div style={styles.root}>
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <A href="/" style={styles.brand}>
            {SITE.handle}
          </A>
          <div style={styles.navLinks}>
            <For each={NAV_LINKS}>
              {(link) => (
                <A href={link.href} style={linkStyle(link.href)}>
                  {link.label}
                </A>
              )}
            </For>
          </div>
        </div>
      </nav>

      <main style={styles.main}>{props.children}</main>

      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span>Built with SolidStart v2</span>
        </div>
      </footer>
    </div>
  );
}
