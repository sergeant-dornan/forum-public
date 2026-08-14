import { ClientGetter } from "./core/getters/ClientGetter";
import { ServerGetter } from "./core/getters/ServerGetter";

class Http {
  public client: ClientGetter;
  public server: ServerGetter;

  constructor() {
    this.client = new ClientGetter();
    this.server = new ServerGetter();
  }
}

const http = new Http();
export default http;