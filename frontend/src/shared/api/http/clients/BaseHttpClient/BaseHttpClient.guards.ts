import type { Error } from "@forum/shared/http";

export function isHttpErrorResponseBody(json: unknown): json is Error.ResBody {
  return (
    json !== null 
    && typeof json === "object"
    && "message" in json
    && typeof json.message === "string"
  )
}