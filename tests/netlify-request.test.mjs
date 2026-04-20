import test from "node:test";
import assert from "node:assert/strict";

import { normalizeNetlifyRequest } from "../build/netlify-request.js";

test("leaves absolute Request URLs unchanged", () => {
  const request = new Request("https://devagr.me/about", {
    headers: { host: "devagr.me", "x-forwarded-proto": "https" },
  });

  const normalized = normalizeNetlifyRequest(request);

  assert.equal(normalized, request);
  assert.equal(normalized.url, "https://devagr.me/about");
});

test("converts relative request-like URLs into absolute Requests", () => {
  const normalized = normalizeNetlifyRequest({
    url: "/",
    method: "GET",
    headers: new Headers({ host: "devagr.me", "x-forwarded-proto": "https" }),
  });

  assert.ok(normalized instanceof Request);
  assert.equal(normalized.url, "https://devagr.me/");
  assert.equal(normalized.method, "GET");
});

test("preserves method body and forwarded host when normalizing", async () => {
  const normalized = normalizeNetlifyRequest({
    url: "/contact?from=test",
    method: "POST",
    headers: new Headers({
      host: "internal.netlify",
      "x-forwarded-host": "devagr.me",
      "x-forwarded-proto": "https",
      "content-type": "application/json",
    }),
    body: JSON.stringify({ hello: "world" }),
  });

  assert.ok(normalized instanceof Request);
  assert.equal(normalized.url, "https://devagr.me/contact?from=test");
  assert.equal(normalized.method, "POST");
  assert.equal(await normalized.text(), '{"hello":"world"}');
});
