import { useMemo, useReducer } from "react";
import { messagesReducer } from "./messagesReducer";
import type { MessagesRecord } from "./useMessagesState.types";
import { createMessagesGroups } from "./useMessagesState.helpers";
import type { MessageListItem } from "@forum/shared/schemas";

export default function useMessagesState(
  initialMessages: MessageListItem[]
) {
  const [messagesRecord, messagesDispatch] = useReducer(messagesReducer, initialMessages, (initialMessages) => {
    return initialMessages.reduce<MessagesRecord>((acc, message) => {
      acc[message.messageId] = message;
      return acc;
    }, {});
  });

  // Сообщения по групам для виртуализации
  const messagesGroups = useMemo(() => {
    return createMessagesGroups(Object.values(messagesRecord));
  }, [messagesRecord]);

  
  // Айди последнего сообщения
  const lastMessageId = useMemo(() => {
    const result = Math.max(...Object.keys(messagesRecord).map(Number));
    return isFinite(result) ? result.toString() : undefined;
  }, [messagesRecord]);

  return { messagesGroups, messagesDispatch, lastMessageId };
}