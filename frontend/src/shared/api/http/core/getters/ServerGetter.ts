import { AuthHttpClient } from "../clients/AuthHttpClient";
import { CategoryHttpClient } from "../clients/CategoryHttpClient";
import { MessageHttpClient } from "../clients/MessageHttpClient";
import { TopicHttpClient } from "../clients/TopicHttpClient";
import { UserHttpClient } from "../clients/UserHttpClient";

export class ServerGetter {
  public createAuthClient(sessionCookieValue?: string | undefined): AuthHttpClient {
    const cookieHeader = sessionCookieValue ? `session=${sessionCookieValue}` : undefined;
    return new AuthHttpClient(cookieHeader);
  }

  public async createCategoryClient(): Promise<CategoryHttpClient> {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const cookieHeader = sessionCookie ? `session=${sessionCookie}` : undefined;
    return new CategoryHttpClient(cookieHeader);
  }

  public async createMessageClient(): Promise<MessageHttpClient> {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const cookieHeader = sessionCookie ? `session=${sessionCookie}` : undefined;
    return new MessageHttpClient(cookieHeader);
  }

  public async createTopicClient(): Promise<TopicHttpClient> {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const cookieHeader = sessionCookie ? `session=${sessionCookie}` : undefined;
    return new TopicHttpClient(cookieHeader);
  }

  public async createUserClient(): Promise<UserHttpClient> {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const cookieHeader = sessionCookie ? `session=${sessionCookie}` : undefined;
    return new UserHttpClient(cookieHeader);
  }
}