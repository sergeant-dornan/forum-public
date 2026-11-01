import { GetMe, GetUserRoles, GetUserTopics } from "@forum/shared/http";
import BaseHttpClient from "./BaseHttpClient/BaseHttpClient";

export class UserHttpClient extends BaseHttpClient {
  getRoles() {
    return this.request(GetUserRoles, "GET", "/user/roles");
  }


  getTopics() {
    return this.request(GetUserTopics, "GET", "/user/topics");
  }


  getMe() {
    return this.request(GetMe, "GET", "/user/me");
  }
}