/// <reference types="vite/client" />

/**
 * Analytics scaffold — zero-dependency and safe with no provider configured.
 *
 * Current lightweight integration target: Plausible-compatible `window.plausible`.
 * If no provider/env vars are present, calls no-op so routes/components can add
 * tracking safely before production analytics is wired in.
 */

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: AnalyticsProperties; u?: string }) => void;
  }
}

/** Named events that can be emitted across the site. */
export type AnalyticsEvent =
  | "page_view"
  | "cta_contact"
  | "cta_resume"
  | "cta_speaking"
  | "cta_work"
  | "cta_talks"
  | "nav_click"
  | "featured_work_click"
  | "talk_click"
  | "oss_click"
  | "social_click"
  | "writing_click";

export type AnalyticsProperties = Record<string, string | number | boolean>;

const ANALYTICS_DOMAIN = import.meta.env.VITE_ANALYTICS_DOMAIN as string | undefined;
const ANALYTICS_SRC =
  (import.meta.env.VITE_ANALYTICS_SRC as string | undefined) ?? "https://plausible.io/js/script.js";

function isEnabled(): boolean {
  return Boolean(ANALYTICS_DOMAIN);
}

function getScriptConfig() {
  if (!isEnabled()) {
    return null;
  }

  return {
    domain: ANALYTICS_DOMAIN!,
    src: ANALYTICS_SRC,
  };
}

function trackPageView(path?: string): void {
  if (!isEnabled() || typeof window === "undefined") return;

  const nextPath = path ?? window.location.pathname;
  window.plausible?.("pageview", { u: nextPath });
}

function trackEvent(name: AnalyticsEvent, props?: AnalyticsProperties): void {
  if (!isEnabled() || typeof window === "undefined") return;

  window.plausible?.(name, props ? { props } : undefined);
}

export const analytics = { getScriptConfig, isEnabled, trackPageView, trackEvent } as const;
