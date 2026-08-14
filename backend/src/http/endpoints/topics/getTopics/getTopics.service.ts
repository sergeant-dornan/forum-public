import type { TopicListItem } from "@forum/shared";
import { getTopics } from "./getTopics.repository.js";
import { snakeToCamel } from "@/shared/utils/changeCaseUtils.js";

export default async function getTopicsService(): Promise<TopicListItem[]> {
  const topics = snakeToCamel(await getTopics());
  return topics;
}