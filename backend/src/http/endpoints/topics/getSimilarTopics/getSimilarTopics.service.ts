import { getSimilarTopics } from "./getSimilarTopics.repository.js";
import type { TopicListItem, Topic } from "@forum/shared";
import { snakeToCamel } from "@/shared/utils/changeCaseUtils.js";

export default async function getSimilarTopicsService(
  topicId: Topic["topicId"]
): Promise<TopicListItem[]> {
  const topics = snakeToCamel(await getSimilarTopics(topicId));

  return topics;
}