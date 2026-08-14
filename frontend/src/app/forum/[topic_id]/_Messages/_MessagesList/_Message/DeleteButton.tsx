"use client";

import styles from "./message.module.css";
import { deleteMessageAction } from "./action";
import { useUser } from "@/shared/contexts/UserContext";
import ws from "@/shared/api/ws/WebSocketClient";
import { confirmDialog } from "@/shared/utils/swalUtils";
import Image from "next/image";
import { useForum } from "@/shared/contexts/ForumContext";
import type { MessageListItem, TopicDetails } from "@forum/shared";
import { showError } from "@/shared/utils/Error/showError";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import { toAppError } from "@/shared/utils/Error/toAppError";

interface DeleteButtonProps {
  topicId: TopicDetails["topicId"];
  messageId: MessageListItem["messageId"];
  authorId: TopicDetails["userId"];
}

export default function DeleteButton({ topicId, messageId, authorId }: DeleteButtonProps) {
  const { isConnected } = useForum();
  // Получаем список ролей, в которых пользователь
  const { loading, user } = useUser();
  if (loading || !user) return null;

  const { roles, userId } = user;

  // Не рендерим если пользователь не админ или автор
  if (roles[topicId] !== "admin" && authorId !== userId) return null

  // Ф-ия нажатия на кнопку
  const deleteHandler = async (messageId: MessageListItem["messageId"]) => {
    try {
      if (!isConnected) throw ErrorFactory.networkError();

      if (await confirmDialog("Удалить сообщение?", "Это действие нельзя отменить...")) {
        const result = await deleteMessageAction(messageId);
        if (isAppError(result)) throw result;

        ws.notify.messageDeleted(topicId, messageId);
      }
    }
    catch (error) {
      showError(toAppError(error));
    }
  }
  return (
    <button onClick={() => { deleteHandler(messageId) }} title="Удалить сообщение" className={`grey rounded ${styles["message-button"]}`}>
      <Image src="/ui/trash.svg" alt="Удалить" height={24} width={24} />
    </button>
  )
}