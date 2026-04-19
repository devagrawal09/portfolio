import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { AnalyticsTracker } from "~/components/AnalyticsTracker";
import { Layout } from "~/components/Layout";
import { PersonJsonLd, WebSiteJsonLd } from "~/components/JsonLd";
import "~/styles/global.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <AnalyticsTracker />
          {/* Site-level structured data — emitted on every page */}
          <WebSiteJsonLd />
          <PersonJsonLd />
          <Layout>
            <Suspense>{props.children}</Suspense>
          </Layout>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
