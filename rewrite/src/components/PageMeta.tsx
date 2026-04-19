import { Link, Meta, Title } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";
import { Show } from "solid-js";
import { WebPageJsonLd } from "~/components/JsonLd";
import { SITE } from "~/config/site";

interface PageMetaProps {
  title?: string;
  description?: string;
  /** Path-relative or absolute URL for the OG image. Defaults to SITE.og.image. */
  ogImage?: string;
  /** Override the canonical URL. Defaults to SITE.url + current pathname. */
  canonical?: string;
  /** Set to true to emit a noindex robots tag (e.g. draft pages). */
  noIndex?: boolean;
}

export function PageMeta(props: PageMetaProps) {
  const location = useLocation();

  const title = () => (props.title ? `${props.title} | ${SITE.name}` : SITE.name);
  const description = () => props.description ?? SITE.description;
  const ogImage = () => {
    const img = props.ogImage ?? SITE.og.image;
    // Prefix relative paths with the site URL so OG crawlers get an absolute URL.
    return img.startsWith("http") ? img : `${SITE.url}${img}`;
  };
  const canonical = () => props.canonical ?? `${SITE.url}${location.pathname}`;

  return (
    <>
      <Title>{title()}</Title>
      <Meta name="description" content={description()} />
      <Show when={props.noIndex}>
        <Meta name="robots" content="noindex,nofollow" />
      </Show>

      <WebPageJsonLd title={title()} description={description()} url={canonical()} />

      {/* Canonical URL */}
      <Link rel="canonical" href={canonical()} />

      {/* Open Graph */}
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content={canonical()} />
      <Meta property="og:site_name" content={SITE.name} />
      <Meta property="og:title" content={title()} />
      <Meta property="og:description" content={description()} />
      <Meta property="og:image" content={ogImage()} />

      {/* Twitter / X card */}
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:site" content={SITE.social.twitterHandle} />
      <Meta name="twitter:creator" content={SITE.social.twitterHandle} />
      <Meta name="twitter:title" content={title()} />
      <Meta name="twitter:description" content={description()} />
      <Meta name="twitter:image" content={ogImage()} />
    </>
  );
}
