import BaseHttpClientCore from "./BaseHttpClientCore";
import { toAppError } from "@/shared/utils/Error/toAppError";
import { isHttpErrorResponseBody } from "@/shared/api/http/core/clients/BaseHttpClient/BaseHttpClient.guards";
import HttpStatusValidator from "./HttpStatusValidator";
import { parseJsonWithDates } from "@/shared/utils/parseJsonWithDates";
import type { AppError } from "@/shared/utils/Error/Error.types";

type RequestReturnValue<T extends unknown> = {
  data: T;
  headers: Headers;
};

export default class BaseHttpClient {
  private defaultOptions: RequestInit = {
    headers: { "Content-Type": "application/json;charset=utf-8" }
  };
  private core: BaseHttpClientCore;
  private httpStatusValidator: HttpStatusValidator;

  constructor(protected cookieHeader?: string) {
    this.core = new BaseHttpClientCore(this.defaultOptions, cookieHeader),
      this.httpStatusValidator = new HttpStatusValidator();
  }

  async request<T extends unknown>(
    url: string, options: RequestInit
  ): Promise<RequestReturnValue<T> | AppError> {
    try {
      const fetchOptions = this.core.buildFetchOptions(options);

      const res = await this.core.fetch(url, fetchOptions);
      if (!this.httpStatusValidator.hasBody(res)) return {
        headers: res.headers
      } as RequestReturnValue<never>
      
      const json = await parseJsonWithDates(res);

      if (json instanceof Error) throw json;
      if (isHttpErrorResponseBody(json)) return this.httpStatusValidator.validateResponseError(res, json);

      return {
        data: json as T,
        headers: res.headers
      };
    }
    catch (error) {
      return toAppError(error);
    }
  }
}