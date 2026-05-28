import { Navigate, useParams } from "@solidjs/router";
import { getLegacyWritingPath } from "~/routes/content/writing/legacyRedirects";

export default function LegacyReviewRedirect() {
  const params = useParams<{ slug: string }>();
  return <Navigate href={getLegacyWritingPath(params.slug)} />;
}
