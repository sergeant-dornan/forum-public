import BaseHttpClientCore from "./BaseHttpClientCore";
import { toAppError } from "@/shared/utils/Error/toAppError";
import { isHttpErrorResponseBody } from "@/shared/api/http/clients/BaseHttpClient/BaseHttpClient.guards";
import HttpStatusValidator from "./HttpStatusValidator";
import type { AppError } from "@/shared/utils/Error/Error.types";
import type { Union } from "@forum/shared/http";
import type { HttpMethod, RequestReturnValue } from "./BaseHttpClient.types";
import type { EndpointFullSchema } from "@/shared/utils/parseJsonSafely/parseJsonSafely.types";
import { parseHttpJsonSafely } from "@/shared/utils/parseJsonSafely/parseHttpJsonSafely";

export default class BaseHttpClient {
  private defaultOptions: RequestInit = {
    headers: { "Content-Type": "application/json;charset=utf-8" }
  };
  private core: BaseHttpClientCore;
  private httpStatusValidator: HttpStatusValidator;

  constructor(protected cookieHeader?: string) {
    this.core = new BaseHttpClientCore(this.defaultOptions, cookieHeader);
    this.httpStatusValidator = new HttpStatusValidator();
  }

  protected async request<
    P extends Union.Params, R extends Union.ResBody, B extends Union.ReqBody, Q extends Union.ReqQuery
  >(
    schema: EndpointFullSchema<P, R, B, Q>,
    method: HttpMethod,
    url: string,
    options?: RequestInit
  ): Promise<RequestReturnValue<R> | AppError> {
    try {
      const fetchOptions = this.core.buildFetchOptions(method, options);

      const res = await this.core.fetch(url, fetchOptions);
      if (!this.httpStatusValidator.hasBody(res)) return {
        headers: res.headers
      } as RequestReturnValue<never>

      const json = await res.json();

      if (isHttpErrorResponseBody(json)) return this.httpStatusValidator.validateResponseError(res, json);

      const parsed = await parseHttpJsonSafely(schema, json);
      if (parsed instanceof Error) throw json;

      return {
        data: parsed,
        headers: res.headers
      };
    }
    catch (error) {
      return toAppError(error);
    }
  }
}