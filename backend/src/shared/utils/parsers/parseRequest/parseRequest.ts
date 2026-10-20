import type { Union } from "@forum/shared/http";
import { parseOrThrow } from "../parseOrThrow.js";
import type { ParsedRequest, RequestSchema } from "./parseRequest.types.js";

export function parseRequest<P extends Union.Params, B extends Union.ReqBody, Q extends Union.ReqQuery>(
  schema: RequestSchema<P, B, Q>,
  req: { params: unknown, body: unknown, query: unknown }
): ParsedRequest<P, B, Q> {
  return {
    params: parseOrThrow(schema.ParamsSchema, req.params, "params"),
    reqBody: parseOrThrow(schema.ReqBodySchema, req.body, "reqBody"),
    reqQuery: parseOrThrow(schema.ReqQuerySchema, req.query, "reqQuery")
  }
}