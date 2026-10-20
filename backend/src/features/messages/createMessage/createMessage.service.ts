import type { Message } from "@/shared/types/domain/common.domain.js";
import { createAndReturnMessage, getTopicStatus } from "./createMessage.repository.js";
import { ClientError } from "@/shared/utils/CustomErrors.js";
import type { MessageListItem } from "@/shared/types/domain/message.domain.js";
import { fromDb } from "@/shared/mappers/fromDb.mapper.js";

export default async function createMessageService(
  message: Message["textContent"], topicId: Message["topicId"], userId: Message["userId"]
): Promise<MessageListItem> {
  // Проверяем, что тема открыта
  const topicStatus = await getTopicStatus(topicId);
  
  if (topicStatus === undefined)
    throw new Error("topicStatus - undefined");
  else if (topicStatus !== "open")
    throw new ClientError("Отправлять сообщения можно только в открытые темы", 403);

  // Создаем сообщение
  const createdMessage = fromDb(await createAndReturnMessage(topicId, userId, message));
  if (createdMessage === undefined)
    throw new Error("createdMessage - undefined");

  return createdMessage;
}