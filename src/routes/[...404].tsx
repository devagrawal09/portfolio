import { For } from "solid-js";
import { A } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { PageMeta } from "~/components/PageMeta";
import { NAV_LINKS } from "~/config/site";
import { analytics } from "~/config/analytics";

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
      <div class="sketch-page sketch-page-narrow">
        <p class="sketch-eyebrow">404 — Page not found</p>
        <h1 class="sketch-heading">Nothing here.</h1>
        <p class="sketch-body">
          That URL doesn't match any page on the site. Head back somewhere useful.
        </p>

        <A href="/" class="sketch-button">
          Go home
        </A>

        <div class="not-found-grid">
          <For each={NAV_LINKS}>
            {(link) => (
              <A
                href={link.href}
                class="sketch-card not-found-link"
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
