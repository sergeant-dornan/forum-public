import type { User } from "@/shared/types/domain/common.domain.js";
import { getTopicsBySessionId } from "./getUserTopics.repository.js";
import type { TopicListItem } from "@/shared/types/domain/topic.domain.js";
import { fromDb } from "@/shared/mappers/fromDb.mapper.js";

export default async function getUserTopicsService(
  userId: User["userId"]
): Promise<TopicListItem[]> {
  const topics = fromDb(await getTopicsBySessionId(userId));
  return topics;
}