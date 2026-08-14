import { searchTopics } from "./searchTopics.repository.js";
import type { Category, TopicListItem } from "@forum/shared";
import { snakeToCamel } from "@/shared/utils/changeCaseUtils.js";

export default async function searchTopicsService(
  q: string, categoryId?: Category["categoryId"]
): Promise<TopicListItem[]> {
  const topics = snakeToCamel(await searchTopics(q, categoryId));
  
  return topics;
}