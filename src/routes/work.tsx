import type { JSX } from "solid-js";

// Layout wrapper for /work and /work/[slug].
// SolidStart nests the folder routes beneath this file and provides children.
export default function WorkLayout(props: { children?: JSX.Element }) {
  return <>{props.children}</>;
}
