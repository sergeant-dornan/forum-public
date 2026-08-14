import type { HTTP } from "@forum/shared";
import BaseHttpClient from "./BaseHttpClient/BaseHttpClient";

export class UserHttpClient extends BaseHttpClient {
  getRoles() {
    return this.request<HTTP.Data.GetUserRoles>(`/user/roles`, { method: "GET" });
  }


  getTopics() {
    return this.request<HTTP.Data.GetUserTopics>("/user/topics", { method: "GET" });
  }
}