import BaseHttpClient from "./BaseHttpClient/BaseHttpClient";
import type { HTTP, User } from "@forum/shared";

export class AuthHttpClient extends BaseHttpClient {
  checkSession() {
    return this.request<HTTP.Data.CheckSession>("/auth/check-session", { method: "GET" });
  }


  registration(
    username: User["username"], password: User["passwordHash"],
    email: User["email"], phone: User["phone"]
  ) {
    return this.request<HTTP.Data.Registration>("/auth/registration", {
      method: "POST",
      body: JSON.stringify({ username, password, email, phone })
    });
  }


  login(username: User["username"], password: User["passwordHash"]) {
    return this.request<HTTP.Data.Login>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
  }


  logout() {
    return this.request<HTTP.Data.Logout>("/auth/logout", { method: "POST" });
  }
}