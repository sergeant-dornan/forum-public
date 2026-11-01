import { AuthHttpClient } from "../clients/AuthHttpClient";
import { CategoryHttpClient } from "../clients/CategoryHttpClient";
import { MessageHttpClient } from "../clients/MessageHttpClient";
import { TopicHttpClient } from "../clients/TopicHttpClient";
import { UserHttpClient } from "../clients/UserHttpClient";

export class ClientGetter {
  private authHttpClient = new AuthHttpClient();
  private categoryHttpClient = new CategoryHttpClient();
  private messageHttpClient = new MessageHttpClient();
  private topicHttpClient = new TopicHttpClient();
  private userHttpClient = new UserHttpClient();

  public getAuthClient(): AuthHttpClient {
    return this.authHttpClient;
  }

  public getCategoryClient(): CategoryHttpClient {
    return this.categoryHttpClient;
  }

  public getMessageClient(): MessageHttpClient {
    return this.messageHttpClient;
  }

  public getTopicClient(): TopicHttpClient {
    return this.topicHttpClient;
  }

  public getUserClient(): UserHttpClient {
    return this.userHttpClient;
  }
}