import { Navigate, useParams } from "@solidjs/router";

const PROJECT_REDIRECTS: Record<string, string> = {
  hackathon: "/work/hackathon-suite",
  osdp: "/work/osdp",
  portfolio: "/",
};

function getLegacyProjectPath(slug: string): string {
  return PROJECT_REDIRECTS[slug] ?? "/work";
}

export default function LegacyShowcaseProjectRedirect() {
  const params = useParams<{ slug: string }>();
  return <Navigate href={getLegacyProjectPath(params.slug)} />;
}
