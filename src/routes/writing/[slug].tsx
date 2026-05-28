import { Navigate, useParams } from "@solidjs/router";

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  return <Navigate href={`/content/writing/${params.slug}`} />;
}
