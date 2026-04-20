import type { JSX } from "solid-js";

// Layout wrapper for /blog and /blog/[slug].
// These routes exist only to redirect legacy URLs to their new /writing destinations.
export default function BlogLayout(props: { children?: JSX.Element }) {
  return <>{props.children}</>;
}
