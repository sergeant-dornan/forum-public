import type { Message } from "@/shared/types/domain/common.domain.js";
import { getMessages, getMessagesAfter } from "./getMessages.repository.js";
import type { MessageListItem } from "@/shared/types/domain/message.domain.js";
import { fromDb } from "@/shared/mappers/fromDb.mapper.js";

export default async function getMessagesService(
  topicId: Message["topicId"], after?: number
): Promise<MessageListItem[]> {
  // Нужно получить сообщения после айди after
  if (after) {
    return fromDb(await getMessagesAfter(topicId, after));
  } else {
    return fromDb(await getMessages(topicId));
  }
}