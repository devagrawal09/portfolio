import { Navigate, useParams } from "@solidjs/router";

const PROJECT_REDIRECTS: Record<string, string> = {
  hackathon: "/projects/hackathon-suite",
  osdp: "/projects/osdp",
  portfolio: "/",
};

function getLegacyProjectPath(slug: string): string {
  return PROJECT_REDIRECTS[slug] ?? "/projects";
}

export default function LegacyShowcaseProjectRedirect() {
  const params = useParams<{ slug: string }>();
  return <Navigate href={getLegacyProjectPath(params.slug)} />;
}
