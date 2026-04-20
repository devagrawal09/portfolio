import { Navigate } from "@solidjs/router";

export default function LegacyBlogIndexRedirect() {
  return <Navigate href="/writing" />;
}
