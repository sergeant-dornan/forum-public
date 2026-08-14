import type { MessageListItem, Message } from "@forum/shared";
import { getMessages, getMessagesAfter } from "./getMessages.repository.js";
import { snakeToCamel } from "@/shared/utils/changeCaseUtils.js";

export default async function getMessagesService(
  topicId: Message["topicId"], after?: number
): Promise<MessageListItem[]> {
  // Нужно получить сообщения после айди after
  if (after) {
    return snakeToCamel(await getMessagesAfter(topicId, after));
  } else {
    return snakeToCamel(await getMessages(topicId));
  }
}