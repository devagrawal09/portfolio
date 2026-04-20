import { createHandler, StartServer } from "@solidjs/start/server";
import { normalizeNetlifyRequest } from "../build/netlify-request.js";

const handler = createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));

const originalFetch = handler.fetch.bind(handler);

export default Object.assign(handler, {
  fetch: (request: Request | { url: string; headers?: HeadersInit; method?: string; body?: BodyInit | null }) =>
    originalFetch(normalizeNetlifyRequest(request) as Request),
});
