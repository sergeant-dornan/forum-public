import type { HTTP } from "@forum/shared";

export function isHttpErrorResponseBody(json: unknown): json is HTTP.Core.ErrorResponseBody {
  return (
    json !== null 
    && typeof json === "object"
    && "message" in json
    && typeof json.message === "string"
  )
}