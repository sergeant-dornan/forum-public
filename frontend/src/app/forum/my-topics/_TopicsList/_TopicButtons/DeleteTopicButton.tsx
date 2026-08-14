"use client";

import styles from "./topic-buttons.module.css";
import { deleteTopicAction } from "./action";
import ws from "@/shared/api/ws/WebSocketClient";
import { confirmDialog } from "@/shared/utils/swalUtils";
import Image from "next/image";
import { useForum } from "@/shared/contexts/ForumContext";
import type { Topic } from "@forum/shared";
import { showError } from "@/shared/utils/Error/showError";
import type { DeleteTopicButtonProps } from "./topicButtons.types";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import { toAppError } from "@/shared/utils/Error/toAppError";

export default function DeleteTopicButton({ topicId }: DeleteTopicButtonProps) {
  const { isConnected } = useForum();

  const deleteHandler = async (topicId: Topic["topicId"]) => {
    try {
      if (!isConnected) throw ErrorFactory.networkError();

      if (await confirmDialog("Вы действительно хотите удалить тему?", "После удаления тему нельзя вернуть")) {
        const result = await deleteTopicAction(topicId);
        if (isAppError(result)) throw result;
        
        ws.notify.topicDeleted(topicId);
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