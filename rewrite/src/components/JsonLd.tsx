/**
 * JSON-LD structured data components.
 *
 * Renders schema.org markup as <script type="application/ld+json"> elements.
 * Accepted by Google in both <head> and <body>.
 *
 * Usage:
 *   <WebSiteJsonLd />   — site-level, rendered once in app root
 *   <PersonJsonLd />    — site-level, rendered once in app root
 *   <WebPageJsonLd title="…" description="…" url="…" />  — per-route opt-in
 */

import { SITE } from "~/config/site";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function JsonLdScript(props: { data: object }) {
  return (
    // eslint-disable-next-line solid/no-innerhtml
    <script type="application/ld+json" innerHTML={JSON.stringify(props.data)} />
  );
}

// ---------------------------------------------------------------------------
// Site-level schemas (render once at the app root)
// ---------------------------------------------------------------------------

/** schema.org/WebSite — describes the site itself. */
export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
  };
  return <JsonLdScript data={data} />;
}

/** schema.org/Person — describes the site owner. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
    jobTitle: SITE.profile.jobTitle,
    email: SITE.profile.email,
    sameAs: [...SITE.profile.sameAs],
  };
  return <JsonLdScript data={data} />;
}

// ---------------------------------------------------------------------------
// Per-page schema (opt-in from route components)
// ---------------------------------------------------------------------------

interface WebPageJsonLdProps {
  title?: string;
  description?: string;
  /** Canonical URL for this page. Defaults to SITE.url. */
  url?: string;
}

/** schema.org/WebPage — add to any route that benefits from page-level markup. */
export function WebPageJsonLd(props: WebPageJsonLdProps) {
  const data = () => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: props.title ?? SITE.name,
    description: props.description ?? SITE.description,
    url: props.url ?? SITE.url,
    isPartOf: { "@type": "WebSite", url: SITE.url },
  });
  return <JsonLdScript data={data()} />;
}
