import type { Topic, TopicDetails } from "@forum/shared";
import { createAndReturnTopic, getUserTopicsCounts } from "./createTopic.repository.js";
import { ClientError } from "@/shared/utils/ClientError.js";
import { snakeToCamel } from "@/shared/utils/changeCaseUtils.js";

export default async function createTopicService(
  title: Topic["title"], categoryId: Topic["categoryId"], userId: Topic["userId"], description: Topic["description"]
): Promise<TopicDetails> {
  const counts = await getUserTopicsCounts(userId);
  if (counts === undefined) {
    throw new Error("counts - undefined");
  }

  const { openTopicsCount, topicsCount } = counts;
  if (openTopicsCount >= 5) {
    throw new ClientError("Превышен лимит открытых тем. Чтобы создать новую тему, закройте старую", 403);
  } else if (topicsCount >= 30) {
    throw new ClientError("Превышен лимит созданных тем. Чтобы создать новую тему, удалите старую", 403);
  }

  // Создаем тему, возвращаем эту тему
  const topic = snakeToCamel(await createAndReturnTopic(title, categoryId, userId, description));
  if (topic === undefined) {
    throw new Error("topic - undefined");
  }
  return topic;
}