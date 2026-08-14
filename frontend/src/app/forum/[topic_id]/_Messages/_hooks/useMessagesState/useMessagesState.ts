import { useMemo, useReducer } from "react";
import { messagesReducer } from "./messagesReducer";
import type { MessageListItem } from "@forum/shared";
import type { MessagesRecord, UseMessagesStateReturnValue } from "./useMessagesState.types";
import { createMessagesGroups } from "./helpers";

export default function useMessagesState(
  initialMessages: MessageListItem[]
): UseMessagesStateReturnValue {
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
    return isFinite(result) ? result : undefined;
  }, [messagesRecord]);

  return { messagesGroups, messagesDispatch, lastMessageId };
}