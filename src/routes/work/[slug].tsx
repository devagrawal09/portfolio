import { Navigate, useParams } from "@solidjs/router";

export default function WorkProjectRedirect() {
  const params = useParams<{ slug: string }>();
  return <Navigate href={`/projects/${params.slug}`} />;
}
