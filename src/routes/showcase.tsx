import type { JSX } from "solid-js";

// Layout wrapper for /showcase/* legacy routes.
// These routes exist only to redirect to their current destinations.
export default function ShowcaseLayout(props: { children?: JSX.Element }) {
  return <>{props.children}</>;
}
