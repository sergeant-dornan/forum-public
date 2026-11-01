import type { HTTP, WS } from "@forum/shared/api";

export type ParseableSchema<DataType> = {
  safeParse(data: unknown):
    | { success: true, data: DataType }
    | { success: false, error: { issues: unknown[] } }
}

export type EndpointFullSchema<P extends HTTP.Union.Params, R extends HTTP.Union.ResBody, B extends HTTP.Union.ReqBody, Q extends HTTP.Union.ReqQuery> = {
  ParamsSchema: ParseableSchema<P>;
  ResBodySchema: ParseableSchema<R>;
  ReqBodySchema: ParseableSchema<B>;
  ReqQuerySchema: ParseableSchema<Q>;
};

export type WSMessageSchema<M extends WS.Union.Response> = ParseableSchema<M>;