import type { Topic, User } from "@forum/shared";
import { deleteTopic, isTopicAuthor } from "./deleteTopic.repository.js";
import { ClientError } from "@/shared/utils/ClientError.js";

export default async function deleteTopicService(
  topicId: Topic["topicId"], userId: User["userId"]
): Promise<void> {
  // Проверяем, что пользователь создал тему
  const isAuthor = await isTopicAuthor(userId, topicId);
  if (isAuthor === false) {
    throw new ClientError("Удалить тему может только автор", 403);
  }
  await deleteTopic(topicId);
}