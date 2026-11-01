import http from "@/shared/api/http/HttpClient";
import ForumDataInitializerClient from "./ForumDataInitializerClient";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import type { ReactNode } from "react";

export default async function ForumDataInitializer({ children }: { children: ReactNode }) {
  const [userHttpClient, topicHttpClient, categoriesHttpClient] = await Promise.all([
    http.server.createUserClient(),
    http.server.createTopicClient(),
    http.server.createCategoryClient()
  ]);

  const [userResult, topicsResult, categoriesResult] = await Promise.all([
    userHttpClient.getMe(),
    topicHttpClient.getTopics(),
    categoriesHttpClient.getCategories(),
  ]);

  if (isAppError(userResult)) throw userResult;
  if (isAppError(topicsResult)) throw topicsResult;
  if (isAppError(categoriesResult)) throw categoriesResult;

  return (
    <ForumDataInitializerClient
      user={userResult.data}
      categories={categoriesResult.data}
      topics={topicsResult.data}
    >
      {children}
    </ForumDataInitializerClient>
  );
}