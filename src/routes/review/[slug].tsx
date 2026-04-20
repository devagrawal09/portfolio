import { Navigate, useParams } from "@solidjs/router";
import { getLegacyWritingPath } from "~/data/writing";

export default function LegacyReviewRedirect() {
  const params = useParams<{ slug: string }>();
  return <Navigate href={getLegacyWritingPath(params.slug)} />;
}
