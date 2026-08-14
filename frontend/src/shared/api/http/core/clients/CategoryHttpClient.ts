import type { HTTP } from "@forum/shared";
import BaseHttpClient from "./BaseHttpClient/BaseHttpClient";

export class CategoryHttpClient extends BaseHttpClient {
  getCategories() {
    return this.request<HTTP.Data.GetCategories>("/categories", { method: "GET" });
  }
}