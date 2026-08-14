import type { TopicListItem, User } from "@forum/shared";
import { getTopicsBySessionId } from "./getUserTopics.repository.js";
import { snakeToCamel } from "@/shared/utils/changeCaseUtils.js";

export default async function getUserTopicsService(
  userId: User["userId"]
): Promise<TopicListItem[]> {
  const topics = snakeToCamel(await getTopicsBySessionId(userId));
  return topics;
}