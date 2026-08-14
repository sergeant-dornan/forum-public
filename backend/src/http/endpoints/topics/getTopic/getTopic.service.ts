import type { TopicDetails, Topic } from "@forum/shared";
import { getTopic } from "./getTopic.repository.js";
import { snakeToCamel } from "@/shared/utils/changeCaseUtils.js";

export default async function getTopicService(
  topicId: Topic["topicId"]
): Promise<TopicDetails> {
  const topic = snakeToCamel(await getTopic(topicId));
  if (topic === undefined) {
    throw new Error("topic - undefined");
  }
  return topic;
}