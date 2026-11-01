"use client";

import http from "@/shared/api/http/HttpClient";
import ws from "@/shared/api/ws/WebSocketClient";
import { useEffect } from "react";
import { showError } from "@/shared/utils/Error/showError";
import type { UseMessagesStateReturnValue } from "./useMessagesState/useMessagesState.types";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import type { TopicId } from "@forum/shared/schemas";
import type { CreateMessage, DeleteMessage } from "@forum/shared/ws";

export default function useMessagesWebSocket(
  topicId: TopicId,
  messagesDispatch: UseMessagesStateReturnValue["messagesDispatch"],
  lastMessageId: UseMessagesStateReturnValue["lastMessageId"]
) {
  useEffect(() => {
    // Коллбек подписки на получение сообщений
    const handleCreate = (data: CreateMessage.ResponsePayload) => {
      // Сообщение для этой темы?
      if (data.topicId !== topicId) return;
      messagesDispatch({ type: "ADD", payload: data.message });
    }

    // Коллбек подписки на удаление сообщений
    const handleDelete = (data: DeleteMessage.ResponsePayload) => {
      // Сообщение для этой темы?
      if (data.topicId !== topicId) return;
      messagesDispatch({ type: "DELETE", messageId: data.messageId });
    }

    // Подписываемся на ws
    ws.on("message:created", handleCreate);
    ws.on("message:deleted", handleDelete);

    // При размонтировании отписываемся
    return () => {
      ws.off("message:created", handleCreate);
      ws.off("message:deleted", handleDelete);
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