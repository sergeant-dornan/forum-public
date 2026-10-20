import type { Union } from "@forum/shared/http";

export type HttpMethod = "GET" | "POST" | "DELETE" | "UPDATE" | "PUT" | "PATCH";

export type RequestReturnValue<S extends Union.ResBody> = {
  data: S;
  headers: Headers;
};