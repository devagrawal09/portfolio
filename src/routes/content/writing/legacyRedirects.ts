const legacyWritingPaths: Record<string, string> = {
  "powersync-building-ai-powered-apps-part-2":
    "/content/writing/powersync-building-ai-powered-apps-part-2",
  "powersync-building-ai-powered-apps-part-1":
    "/content/writing/powersync-building-ai-powered-apps-part-1",
  "powersync-why-is-every-ai-app-single-player":
    "/content/writing/powersync-why-is-every-ai-app-single-player",
  "powersync-most-ai-chat-apps-are-broken":
    "/content/writing/powersync-most-ai-chat-apps-are-broken",
  "powersync-offline-first-tanstack-db": "/content/writing/powersync-offline-first-tanstack-db",
  "powersync-unleashing-the-power-of-sync":
    "/content/writing/powersync-unleashing-the-power-of-sync",
  "devto-async-transformations-in-reactivity":
    "/content/writing/devto-async-transformations-in-reactivity",
  "devto-scheduling-transformations-in-reactivity":
    "/content/writing/devto-scheduling-transformations-in-reactivity",
  "devto-transformations-in-reactivity": "/content/writing/devto-transformations-in-reactivity",
  "devto-dynamic-typing-is-obsolete": "/content/writing/devto-dynamic-typing-is-obsolete",
  "devto-server-components-websockets": "/content/writing/devto-server-components-websockets",
  "medium-server-components-websockets": "/content/writing/medium-server-components-websockets",
  "clerk-webhooks-data-sync-convex": "/content/writing/clerk-webhooks-data-sync-convex",
  "devto-clerk-webhooks-data-sync-convex": "/content/writing/devto-clerk-webhooks-data-sync-convex",
  "medium-clerk-webhooks-data-sync-convex":
    "/content/writing/medium-clerk-webhooks-data-sync-convex",
  "clerk-webhooks-getting-started": "/content/writing/clerk-webhooks-getting-started",
  "devto-clerk-webhooks-getting-started": "/content/writing/devto-clerk-webhooks-getting-started",
  "medium-clerk-webhooks-getting-started": "/content/writing/medium-clerk-webhooks-getting-started",
  "clerk-how-we-roll-roundup": "/content/writing/clerk-how-we-roll-roundup",
  "clerk-how-we-roll-infrastructure": "/content/writing/clerk-how-we-roll-infrastructure",
  "clerk-how-we-roll-sessions": "/content/writing/clerk-how-we-roll-sessions",
  "clerk-how-we-roll-jwt-sso": "/content/writing/clerk-how-we-roll-jwt-sso",
  "clerk-how-we-roll-email-verification": "/content/writing/clerk-how-we-roll-email-verification",
  isomorphic: "/content/writing/isomorphic",
  serverless: "/content/writing/serverless",
  "medium-serverless-deployment": "/content/writing/medium-serverless-deployment",
  "medium-isomorphic-code": "/content/writing/medium-isomorphic-code",
  "medium-learning-software-development-part-2":
    "/content/writing/medium-learning-software-development-part-2",
  "medium-learning-software-development-part-1":
    "/content/writing/medium-learning-software-development-part-1",
  "medium-hitchd": "/content/writing/medium-hitchd",
  "medium-my-first-app-release-v0-1": "/content/writing/medium-my-first-app-release-v0-1",
  "medium-my-first-app": "/content/writing/medium-my-first-app",
  senior: "/content/writing/senior",
  junior: "/content/writing/junior",
  "pre-junior": "/content/writing/pre-junior",
  sophomore: "/content/writing/sophomore",
  freshman: "/content/writing/freshman",
};

export function getLegacyWritingPath(slug: string) {
  return legacyWritingPaths[slug] ?? "/content/writing";
}
