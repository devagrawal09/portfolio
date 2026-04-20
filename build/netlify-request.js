const ABSOLUTE_URL_RE = /^[a-zA-Z][a-zA-Z\d+.-]*:/;

function getHeader(headers, name) {
  if (!headers) return undefined;

  if (headers instanceof Headers) {
    return headers.get(name) ?? undefined;
  }

  if (Array.isArray(headers)) {
    const match = headers.find(([key]) => key.toLowerCase() === name.toLowerCase());
    return match?.[1];
  }

  const value = headers[name] ?? headers[name.toLowerCase()] ?? headers[name.toUpperCase()];
  if (Array.isArray(value)) return value[0];
  return value ?? undefined;
}

function firstHeaderValue(value) {
  return value?.split(",")[0]?.trim() || undefined;
}

function buildAbsoluteUrl(url, headers) {
  const host =
    firstHeaderValue(getHeader(headers, "x-forwarded-host")) ||
    firstHeaderValue(getHeader(headers, "host")) ||
    "localhost";

  const protocol =
    firstHeaderValue(getHeader(headers, "x-forwarded-proto")) ||
    (host.includes("localhost") ? "http" : "https");

  return new URL(url, `${protocol}://${host}`).toString();
}

function toRequestInit(requestLike) {
  const method = requestLike?.method || "GET";
  const hasBody = requestLike?.body != null && !/^(GET|HEAD)$/i.test(method);

  return {
    method,
    headers: requestLike?.headers,
    body: hasBody ? requestLike.body : undefined,
    duplex: hasBody ? (requestLike?.duplex ?? "half") : undefined,
    cache: requestLike?.cache,
    credentials: requestLike?.credentials,
    integrity: requestLike?.integrity,
    keepalive: requestLike?.keepalive,
    mode: requestLike?.mode,
    redirect: requestLike?.redirect,
    referrer: requestLike?.referrer,
    referrerPolicy: requestLike?.referrerPolicy,
    signal: requestLike?.signal,
  };
}

export function normalizeNetlifyRequest(requestLike) {
  if (requestLike instanceof Request) {
    return requestLike;
  }

  const url = requestLike?.url;
  if (typeof url !== "string") {
    return requestLike;
  }

  const absoluteUrl = ABSOLUTE_URL_RE.test(url)
    ? url
    : buildAbsoluteUrl(url, requestLike?.headers);

  return new Request(absoluteUrl, toRequestInit(requestLike));
}
