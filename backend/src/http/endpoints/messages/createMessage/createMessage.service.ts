import type { Message, MessageListItem } from "@forum/shared";
import { createAndReturnMessage, getTopicStatus } from "./createMessage.repository.js";
import { ClientError } from "@/shared/utils/ClientError.js";
import { snakeToCamel } from "@/shared/utils/changeCaseUtils.js";

export default async function createMessageService(
  message: Message["textContent"], topicId: Message["topicId"], userId: Message["userId"]
): Promise<MessageListItem> {
  // Проверяем, что тема открыта
  const topicStatus = await getTopicStatus(topicId);
  if (topicStatus === undefined) {
    throw new Error("topicStatus - undefined");
  } else if (topicStatus !== "open") {
    throw new ClientError("Отправлять сообщения можно только в открытые темы", 403);
  }

  // Проверяем, что пользователь не забанен

  // Создаем сообщение
  const createdMessage = snakeToCamel(await createAndReturnMessage(topicId, userId, message));
  if (createdMessage === undefined) {
    throw new Error("createdMessage - undefined");
  } 

  return createdMessage;
}