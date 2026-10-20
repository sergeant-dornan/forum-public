import { CheckSession, Login, Logout, Registration } from "@forum/shared/http";
import BaseHttpClient from "./BaseHttpClient/BaseHttpClient";

export class AuthHttpClient extends BaseHttpClient {
  checkSession() {
    return this.request(CheckSession, "GET", "/auth/check-session");
  }


  registration(
    username: Registration.ReqBody["username"], password: Registration.ReqBody["password"],
    email: Registration.ReqBody["email"], phone: Registration.ReqBody["phone"]
  ) {
    return this.request(Registration, "POST", "/auth/registration", {
      body: JSON.stringify({ username, password, email, phone })
    });
  }


  login(
    username: Login.ReqBody["username"],
    password: Login.ReqBody["password"]
  ) {
    return this.request(Login, "POST", "/auth/login", {
      body: JSON.stringify({ username, password })
    });
  }


  logout() {
    return this.request(Logout, "POST", "/auth/logout");
  }
}