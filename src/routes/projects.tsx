import type { JSX } from "solid-js";

// Layout wrapper for /projects and static project routes.
// SolidStart nests the folder routes beneath this file and provides children.
export default function ProjectsLayout(props: { children?: JSX.Element }) {
  return <>{props.children}</>;
}
