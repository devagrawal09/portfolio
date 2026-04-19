import { Meta, Title } from "@solidjs/meta";
import { SITE } from "~/config/site";

interface PageMetaProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

export function PageMeta(props: PageMetaProps) {
  const title = () => (props.title ? `${props.title} | ${SITE.name}` : SITE.name);
  const description = () => props.description ?? SITE.description;
  const ogImage = () => props.ogImage ?? SITE.og.image;

  return (
    <>
      <Title>{title()}</Title>
      <Meta name="description" content={description()} />
      <Meta property="og:title" content={title()} />
      <Meta property="og:description" content={description()} />
      <Meta property="og:image" content={ogImage()} />
      <Meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
