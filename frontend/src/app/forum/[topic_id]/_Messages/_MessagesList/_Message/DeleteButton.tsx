"use client";

import styles from "./message.module.css";
import ws from "@/shared/api/ws/WebSocketClient";
import { confirmDialog } from "@/shared/utils/swalUtils";
import Image from "next/image";
import { useApp } from "@/contexts/AppContext";
import { showError } from "@/shared/utils/Error/showError";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { toAppError } from "@/shared/utils/Error/toAppError";
import { useAppSelector } from "@/lib/hooks";
import type { MessageId, TopicId, UserId } from "@forum/shared/schemas";

interface DeleteButtonProps {
  topicId: TopicId;
  messageId: MessageId;
  authorId: UserId;
}

export default function DeleteButton({ topicId, messageId, authorId }: DeleteButtonProps) {
  const { isConnected } = useApp();
  // Получаем список ролей, в которых пользователь
  const user = useAppSelector((state) => state.user);

  // Не рендерим если пользователь не админ и не автор
  if (user.roles[topicId] !== "admin" && user.userId !== authorId) return null;

  // Ф-ия нажатия на кнопку
  const deleteHandler = async (messageId: MessageId) => {
    try {
      if (!isConnected) throw ErrorFactory.networkError();

      if (await confirmDialog("Удалить сообщение?", "Это действие нельзя отменить...")) {
        ws.send.deleteMessage({ topicId, messageId });
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