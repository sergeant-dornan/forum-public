import { isAppError } from "@/shared/utils/Error/Error.guards";
import NavigationContent from "./NavigationContent";
import http from "@/shared/api/http/HttpClient";

export default async function Navigation() {
  const [categoryHttpClient, topicHttpClient] = await Promise.all([
    http.server.createCategoryClient(),
    http.server.createTopicClient()
  ]);

  const [categoriesResult, topicsResult] = await Promise.all([
    categoryHttpClient.getCategories(),
    topicHttpClient.getTopics()
  ]);

  if (isAppError(categoriesResult)) throw categoriesResult;
  if (isAppError(topicsResult)) throw topicsResult;

  const categories = categoriesResult.data;
  const topics = topicsResult.data;

  return <NavigationContent categories={categories} topics={topics} />
}