import { ClientGetter } from "./core/ClientGetter";
import { ClientFactory } from "./core/ClientFactory";

class Http {
  public client: ClientGetter;
  public server: ClientFactory;

  constructor() {
    this.client = new ClientGetter();
    this.server = new ClientFactory();
  }
}

const http = new Http();
export default http;