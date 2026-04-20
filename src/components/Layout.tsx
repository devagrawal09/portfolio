import { A, useLocation } from "@solidjs/router";
import type { JSX, ParentProps } from "solid-js";
import { For } from "solid-js";
import { NAV_LINKS, SITE } from "~/config/site";
import { colors, space } from "~/styles/tokens";

const styles = {
  root: {
    display: "flex",
    "flex-direction": "column",
    "min-height": "100dvh",
  } satisfies JSX.CSSProperties,

  main: {
    flex: "1",
  } satisfies JSX.CSSProperties,

  footer: {
    padding: space[8],
    "border-top": `1px solid ${colors.border}`,
  } satisfies JSX.CSSProperties,
} as const;

export function Layout(props: ParentProps) {
  const location = useLocation();

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);

  const linkColor = (href: string): JSX.CSSProperties => ({
    color: isActive(href) ? colors.accent : colors.textMuted,
  });

  return (
    <div style={styles.root}>
      <a href="#main-content" class="skip-link">
        Skip to main content
      </a>
      <nav class="site-header" aria-label="Primary">
        <div class="site-header-inner">
          <A href="/" class="site-brand">
            {SITE.handle}
          </A>
          <div class="site-nav-links">
            <For each={NAV_LINKS}>
              {(link) => (
                <A href={link.href} class="site-nav-link" style={linkColor(link.href)}>
                  {link.label}
                </A>
              )}
            </For>
          </div>
        </div>
      </nav>

      <main id="main-content" tabindex="-1" style={styles.main}>
        {props.children}
      </main>

      <footer style={styles.footer}>
        <div class="footer-inner">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span>Built with SolidStart v2</span>
        </div>
      </footer>
    </div>
  );
}
