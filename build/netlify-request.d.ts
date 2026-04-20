export function normalizeNetlifyRequest(input: Request): Request;
export function normalizeNetlifyRequest(input: {
  url: string;
  headers?: HeadersInit;
  method?: string;
  body?: BodyInit | null;
  duplex?: "half";
}): Request;
