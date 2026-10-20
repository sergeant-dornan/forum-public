import type { Category } from "@/shared/types/domain/common.domain.js";
import { searchTopics } from "./searchTopics.repository.js";
import type { TopicListItem } from "@/shared/types/domain/topic.domain.js";
import { fromDb } from "@/shared/mappers/fromDb.mapper.js";

export default async function searchTopicsService(
  q: string, categoryId?: Category["categoryId"]
): Promise<TopicListItem[]> {
  const topics = fromDb(await searchTopics(q, categoryId));
  
  return topics;
}