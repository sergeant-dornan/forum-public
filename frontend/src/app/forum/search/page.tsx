import http from "@/shared/api/http/HttpClient";
import TopicSearchPageContent from "./TopicSearchPageContent";
import { isAppError } from "@/shared/utils/Error/Error.guards";

export default async function SearchPage() {
  const categoryHttpClient = await http.server.createCategoryClient();
  const result = await categoryHttpClient.getCategories();
  if (isAppError(result)) throw result;

  return <TopicSearchPageContent categories={result.data} />;
}
