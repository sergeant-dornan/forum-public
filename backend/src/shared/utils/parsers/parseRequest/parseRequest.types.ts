import type { Union } from "@forum/shared/http";
import type { ParseableSchema } from "../parsers.types.js";

export type RequestSchema<P extends Union.Params, B extends Union.ReqBody, Q extends Union.ReqQuery> = {
  ParamsSchema: ParseableSchema<P>;
  ReqBodySchema: ParseableSchema<B>;
  ReqQuerySchema: ParseableSchema<Q>;
}

export interface ParsedRequest<P extends Union.Params, B extends Union.ReqBody, Q extends Union.ReqQuery> {
  params: P;
  reqBody: B;
  reqQuery: Q;
}