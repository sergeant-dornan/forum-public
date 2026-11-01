import { GetCategories } from "@forum/shared/http";
import BaseHttpClient from "./BaseHttpClient/BaseHttpClient";

export class CategoryHttpClient extends BaseHttpClient {
  getCategories() {
    return this.request(GetCategories, "GET", "/categories");
  }
}