"use client";

import http from "@/shared/api/http/HttpClient";
import ws from "@/shared/api/ws/WebSocketClient";
import type { TopicListItem, WS } from "@forum/shared";
import { useEffect } from "react";
import { showError } from "@/shared/utils/Error/showError";
import type { UseMessagesStateReturnValue } from "./useMessagesState/useMessagesState.types";
import { isAppError } from "@/shared/utils/Error/Error.guards";

export default function useMessagesWebSocket(
  topicId: TopicListItem["topicId"],
  messagesDispatch: UseMessagesStateReturnValue["messagesDispatch"],
  lastMessageId: UseMessagesStateReturnValue["lastMessageId"]
) {
  useEffect(() => {
    // Коллбек подписки на получение сообщений
    const handleCreate = (data: WS.Data.MessageCreated) => {
      // Сообщение для этой темы?
      if (data.topicId !== topicId) return;
      messagesDispatch({ type: "ADD", payload: data.message });
    }

    // Коллбек подписки на удаление сообщений
    const handleDelete = (data: WS.Data.MessageDeleted) => {
      // Сообщение для этой темы?
      if (data.topicId !== topicId) return;
      messagesDispatch({ type: "DELETE", messageId: data.messageId });
    }

    // Подписываемся на ws
    ws.on("messageCreated", handleCreate);
    ws.on("messageDeleted", handleDelete);

    // При размонтировании отписываемся
    return () => {
      ws.off("messageCreated", handleCreate);
      ws.off("messageDeleted", handleDelete);
    }
  }, [topicId, messagesDispatch]); // переподписка при смене темы

  useEffect(() => {
    // Коллбек подписки на получение сообщение после подключения/переподключения
    const handleСonnect = async () => {
      if (!lastMessageId) return;
      const messageHttpClient = http.client.getMessageClient();
      const result = await messageHttpClient.getMessages(topicId, { after: lastMessageId });
      if (isAppError(result)) {
        showError(result);
        return;
      }
      messagesDispatch({ type: "ADD", payload: result.data });
    }

    ws.on("connected", handleСonnect);
    return () => {
      ws.off("connected", handleСonnect);
    }
  }, [topicId, messagesDispatch, lastMessageId]);
}