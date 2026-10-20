import type { Topic } from "@/shared/types/domain/common.domain.js";
import { getTopic } from "./getTopic.repository.js";
import type { TopicDetails } from "@/shared/types/domain/topic.domain.js";
import { fromDb } from "@/shared/mappers/fromDb.mapper.js";

export default async function getTopicService(
  topicId: Topic["topicId"]
): Promise<TopicDetails> {
  const topic = fromDb(await getTopic(topicId));
  if (topic === undefined) throw new Error("topic - undefined");

  return topic;
}