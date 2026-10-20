import type { MessagesRecord, MessagesReducerAction } from "./useMessagesState.types";

export function messagesReducer(pervState: MessagesRecord, action: MessagesReducerAction) {
  switch (action.type) {
    case "ADD":
      // Приводим к массиву 
      const messages = Array.isArray(action.payload) ? action.payload : [action.payload];

      // Приводим к Record
      const messagesRecord = messages.reduce<MessagesRecord>((acc, message) => {
        acc[message.messageId] = message;
        return acc;
      }, {});

      // Объединяем
      return {
        ...pervState,
        ...messagesRecord
      }

    case "DELETE":
      // Удаление без мутации
      const { [action.messageId]: _, ...rest } = pervState;
      return rest;

    default:
      return pervState;
  }
}