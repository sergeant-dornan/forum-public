"use client";

import styles from "./topic-buttons.module.css";
import { changeTopicStatusAction } from "./action";
import ws from "@/shared/api/ws/WebSocketClient";
import { confirmDialog } from "@/shared/utils/swalUtils";
import Image from "next/image";
import { useForum } from "@/shared/contexts/ForumContext";
import type { ChangeTopicStatusButtonProps } from "./topicButtons.types";
import type { Topic } from "@forum/shared";
import { showError } from "@/shared/utils/Error/showError";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { toAppError } from "@/shared/utils/Error/toAppError";
import { isAppError } from "@/shared/utils/Error/Error.guards";

export default function CloseTopicButton({ topicId, status }: ChangeTopicStatusButtonProps) {
  const { isConnected } = useForum();

  const closeHandler = async (topicId: Topic["topicId"]) => {
    try {
      if (!isConnected) throw ErrorFactory.networkError();

      if (await confirmDialog("Закрыть тему?", "Закрытые темы отображаются в навигации, но не доступны для обсуждения")) {
        const result = await changeTopicStatusAction(topicId, "closed");
        if (isAppError(result)) throw result;

        ws.notify.topicStatusToggled(topicId, result);
      }
    }
    catch (error) {
      showError(toAppError(error));
    }
  }

  if (status === "closed") return;
  if (status === "open") {
    return (
      <button onClick={() => closeHandler(topicId)} className={`grey rounded ${styles["topic-button"]}`}>
        <h4>Закрыть</h4>
        <Image src="/ui/lock-closed.svg" alt="Закрыть" height={24} width={24} />
      </button>
    );
  }
  return (
    <button onClick={() => closeHandler(topicId)} className={`grey rounded ${styles["topic-button"]}`}>
      <h4>Показать закрытой</h4>
      <Image src="/ui/lock-closed.svg" alt="Закрыть" height={24} width={24} />
    </button>
  );
}