import type { Topic } from "@/shared/types/domain/common.domain.js";
import { getSimilarTopics } from "./getSimilarTopics.repository.js";
import type { TopicListItem } from "@/shared/types/domain/topic.domain.js";
import { fromDb } from "@/shared/mappers/fromDb.mapper.js";

export default async function getSimilarTopicsService(
  topicId: Topic["topicId"]
): Promise<TopicListItem[]> {
  const topics = fromDb(await getSimilarTopics(topicId));

  return topics;
}