import { useLocation } from "@solidjs/router";
import { createEffect, Show } from "solid-js";
import { analytics } from "~/config/analytics";

export function AnalyticsTracker() {
  const location = useLocation();
  const script = analytics.getScriptConfig();
  let previousPath: string | undefined;

  createEffect(() => {
    const nextPath = location.pathname;

    if (nextPath === previousPath) {
      return;
    }

    previousPath = nextPath;
    analytics.trackPageView(nextPath);
  });

  return (
    <Show when={script}>
      {(resolvedScript) => (
        <script defer data-domain={resolvedScript().domain} src={resolvedScript().src} />
      )}
    </Show>
  );
}
