import type { JSX } from "solid-js";

// Layout wrapper for /writing and /writing/[slug].
// SolidStart nests the folder routes beneath this file and provides children.
export default function WritingLayout(props: { children?: JSX.Element }) {
  return <>{props.children}</>;
}
