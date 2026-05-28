import { For } from "solid-js";
import { A } from "@solidjs/router";
import { ContentShell } from "~/components/ContentShell";
import { PageMeta } from "~/components/PageMeta";
import { analytics } from "~/config/analytics";
import { contentTabCounts } from "../contentCounts";
import { articleSummary as powersyncBuildingAiPoweredAppsPart2Summary } from "./powersync-building-ai-powered-apps-part-2";
import { articleSummary as powersyncBuildingAiPoweredAppsPart1Summary } from "./powersync-building-ai-powered-apps-part-1";
import { articleSummary as powersyncWhyIsEveryAiAppSinglePlayerSummary } from "./powersync-why-is-every-ai-app-single-player";
import { articleSummary as powersyncMostAiChatAppsAreBrokenSummary } from "./powersync-most-ai-chat-apps-are-broken";
import { articleSummary as powersyncOfflineFirstTanstackDbSummary } from "./powersync-offline-first-tanstack-db";
import { articleSummary as powersyncUnleashingThePowerOfSyncSummary } from "./powersync-unleashing-the-power-of-sync";
import { articleSummary as devtoAsyncTransformationsInReactivitySummary } from "./devto-async-transformations-in-reactivity";
import { articleSummary as devtoSchedulingTransformationsInReactivitySummary } from "./devto-scheduling-transformations-in-reactivity";
import { articleSummary as devtoTransformationsInReactivitySummary } from "./devto-transformations-in-reactivity";
import { articleSummary as devtoDynamicTypingIsObsoleteSummary } from "./devto-dynamic-typing-is-obsolete";
import { articleSummary as devtoServerComponentsWebsocketsSummary } from "./devto-server-components-websockets";
import { articleSummary as clerkWebhooksDataSyncConvexSummary } from "./clerk-webhooks-data-sync-convex";
import { articleSummary as clerkWebhooksGettingStartedSummary } from "./clerk-webhooks-getting-started";
import { articleSummary as clerkHowWeRollRoundupSummary } from "./clerk-how-we-roll-roundup";
import { articleSummary as clerkHowWeRollInfrastructureSummary } from "./clerk-how-we-roll-infrastructure";
import { articleSummary as seniorSummary } from "./senior";
import { articleSummary as clerkHowWeRollSessionsSummary } from "./clerk-how-we-roll-sessions";
import { articleSummary as clerkHowWeRollJwtSsoSummary } from "./clerk-how-we-roll-jwt-sso";
import { articleSummary as clerkHowWeRollEmailVerificationSummary } from "./clerk-how-we-roll-email-verification";
import { articleSummary as serverlessSummary } from "./serverless";
import { articleSummary as juniorSummary } from "./junior";
import { articleSummary as isomorphicSummary } from "./isomorphic";
import { articleSummary as preJuniorSummary } from "./pre-junior";
import { articleSummary as sophomoreSummary } from "./sophomore";
import { articleSummary as mediumLearningSoftwareDevelopmentPart2Summary } from "./medium-learning-software-development-part-2";
import { articleSummary as mediumLearningSoftwareDevelopmentPart1Summary } from "./medium-learning-software-development-part-1";
import { articleSummary as freshmanSummary } from "./freshman";
import { articleSummary as mediumHitchdSummary } from "./medium-hitchd";
import { articleSummary as mediumMyFirstAppReleaseV01Summary } from "./medium-my-first-app-release-v0-1";
import { articleSummary as mediumMyFirstAppSummary } from "./medium-my-first-app";

type ArticleSummary = { slug: string; title: string; description: string };

export const writingCount = 37;

const featuredPost = powersyncBuildingAiPoweredAppsPart2Summary;
const indexArticles = [
  powersyncBuildingAiPoweredAppsPart2Summary,
  powersyncBuildingAiPoweredAppsPart1Summary,
  powersyncWhyIsEveryAiAppSinglePlayerSummary,
  powersyncMostAiChatAppsAreBrokenSummary,
  powersyncOfflineFirstTanstackDbSummary,
  powersyncUnleashingThePowerOfSyncSummary,
  devtoAsyncTransformationsInReactivitySummary,
  devtoSchedulingTransformationsInReactivitySummary,
  devtoTransformationsInReactivitySummary,
  devtoDynamicTypingIsObsoleteSummary,
  devtoServerComponentsWebsocketsSummary,
  clerkWebhooksDataSyncConvexSummary,
  clerkWebhooksGettingStartedSummary,
  clerkHowWeRollRoundupSummary,
  clerkHowWeRollInfrastructureSummary,
  seniorSummary,
  clerkHowWeRollSessionsSummary,
  clerkHowWeRollJwtSsoSummary,
  clerkHowWeRollEmailVerificationSummary,
  serverlessSummary,
  juniorSummary,
  isomorphicSummary,
  preJuniorSummary,
  sophomoreSummary,
  mediumLearningSoftwareDevelopmentPart2Summary,
  mediumLearningSoftwareDevelopmentPart1Summary,
  freshmanSummary,
  mediumHitchdSummary,
  mediumMyFirstAppReleaseV01Summary,
  mediumMyFirstAppSummary,
] as const;

function ArticleCard(props: { article: ArticleSummary }) {
  const trackClick = () =>
    analytics.trackEvent("writing_click", { slug: props.article.slug, location: "writing_index" });

  return (
    <A
      href={`/content/writing/${props.article.slug}`}
      class="sketch-card content-card article-card"
      id={props.article.slug}
      onClick={trackClick}
    >
      <span>
        <strong>{props.article.title}</strong>
        <em>{props.article.description}</em>
      </span>
    </A>
  );
}

function FeaturedArticle(props: { article: ArticleSummary }) {
  return (
    <A href={`/content/writing/${props.article.slug}`} class="sketch-card content-featured">
      <span>
        <small>Featured Blog Post</small>
        {props.article.title}
      </span>
    </A>
  );
}

export default function ContentWritingPage() {
  return (
    <>
      <PageMeta
        title="Content"
        description="Writing by Dev Agrawal on fullstack engineering, reactive UI, local-first software, and AI systems."
        ogImage="/og/writing.svg"
      />
      <ContentShell tabCounts={contentTabCounts}>
        <FeaturedArticle article={featuredPost} />
        <section class="article-index" aria-label="Writing">
          <div class="article-list">
            <For each={indexArticles}>{(article) => <ArticleCard article={article} />}</For>
          </div>
        </section>
      </ContentShell>
    </>
  );
}
