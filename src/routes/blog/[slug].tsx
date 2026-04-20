import { Navigate, useParams } from "@solidjs/router";
import { getLegacyWritingPath } from "~/data/writing";

export default function LegacyBlogArticleRedirect() {
  const params = useParams<{ slug: string }>();
  return <Navigate href={getLegacyWritingPath(params.slug)} />;
}
