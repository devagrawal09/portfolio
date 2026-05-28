import type { JSX } from "solid-js";

// Layout wrapper for /content and nested content routes.
export default function ContentLayout(props: { children?: JSX.Element }) {
  return <>{props.children}</>;
}
