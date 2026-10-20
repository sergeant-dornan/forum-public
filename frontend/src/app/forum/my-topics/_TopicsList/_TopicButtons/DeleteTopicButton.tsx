"use client";

import styles from "./topic-buttons.module.css";
import ws from "@/shared/api/ws/WebSocketClient";
import { confirmDialog } from "@/shared/utils/swalUtils";
import Image from "next/image";
import { useApp } from "@/contexts/AppContext";
import { showError } from "@/shared/utils/Error/showError";
import type { DeleteTopicButtonProps } from "./topicButtons.types";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { toAppError } from "@/shared/utils/Error/toAppError";
import type { TopicId } from "@forum/shared/schemas";

export default function DeleteTopicButton({ topicId }: DeleteTopicButtonProps) {
  const { isConnected } = useApp();

  const deleteHandler = async (topicId: TopicId) => {
    try {
      if (!isConnected) throw ErrorFactory.networkError();

      if (await confirmDialog("Вы действительно хотите удалить тему?", "После удаления тему нельзя вернуть")) {
        ws.send.deleteTopic({ topicId });
      }
    }
    catch (error) {
      showError(toAppError(error));
    }
  }

  return (
    <button onClick={() => deleteHandler(topicId)} className={`grey rounded ${styles["topic-button"]}`}>
      <h4>Удалить</h4>
      <Image src="/ui/trash.svg" alt="Удалить" height={24} width={24} />
    </button>
  )
}