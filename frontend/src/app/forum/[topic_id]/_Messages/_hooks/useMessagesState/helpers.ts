import type { MessageListItem } from "@forum/shared";
import type { MessagesByDates, MessagesGroup } from "./useMessagesState.types";
import { getDateISO } from "@/shared/utils/dateUtils";

function createMessagesByDates(messages: MessageListItem[]): MessagesByDates {
  const result = messages.reduce<MessagesByDates>((acc, message) => {
    const messageDate = getDateISO(message.createdAt);

    // Если сообщений на дату нет - добавляем массив
    if (!acc[messageDate]) acc[messageDate] = [];
    acc[messageDate].push(message);

    return acc;
  }, {});

  // Сортируем сообщения в каждой группе по времени
  for (const date in result) {
    if (!result[date]) continue;
    result[date].sort((a, b) => a.messageId - b.messageId);
  }

  return result;
}

export function createMessagesGroups(messages: MessageListItem[]): MessagesGroup[] {
  // Создаем объект сообщений по датам
  const messagesByDates = createMessagesByDates(messages);

  // Приводим их к нужной структуре
  const result: MessagesGroup[] = [];
  const sortedDates = Object.keys(messagesByDates).sort();
  sortedDates.forEach((date) => {
    const messages = messagesByDates[date];
    if (messages) result.push({ date, messages });
  });
  return result;
}