import type { TopicListItem } from "@/shared/types/domain/topic.domain.js";
import { getTopics } from "./getTopics.repository.js";
import { fromDb } from "@/shared/mappers/fromDb.mapper.js";

export default async function getTopicsService(): Promise<TopicListItem[]> {
  const topics = fromDb(await getTopics());
  return topics;
}