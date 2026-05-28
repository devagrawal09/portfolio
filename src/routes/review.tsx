import type { JSX } from "solid-js";

// Layout wrapper for /review/* legacy routes.
// These routes exist only to redirect to their current /content destinations.
export default function ReviewLayout(props: { children?: JSX.Element }) {
  return <>{props.children}</>;
}
