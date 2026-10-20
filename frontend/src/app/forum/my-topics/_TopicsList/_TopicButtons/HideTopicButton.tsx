"use client";

import styles from "./topic-buttons.module.css";
import ws from "@/shared/api/ws/WebSocketClient";
import { confirmDialog } from "@/shared/utils/swalUtils";
import Image from "next/image";
import { useApp } from "@/contexts/AppContext";
import type { ChangeTopicStatusButtonProps } from "./topicButtons.types";
import { showError } from "@/shared/utils/Error/showError";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { toAppError } from "@/shared/utils/Error/toAppError";
import type { TopicId } from "@forum/shared/schemas";

export default function HideTopicButton({ topicId, status }: ChangeTopicStatusButtonProps) {
  const { isConnected } = useApp();

  const toggleHandler = async (topicId: TopicId) => {
    try {
      if (!isConnected) throw ErrorFactory.networkError();

      if (await confirmDialog("Скрыть тему?", "Скрытые темы не отображаются в навигации и не доступны для обсуждения")) {
        ws.send.changeTopicStatus({ topicId, status: "hidden" });
      }
    }
    catch (error) {
      showError(toAppError(error));
    }
  }

  if (status !== "hidden") {
    return (
      <button onClick={() => toggleHandler(topicId)} className={`grey rounded ${styles["topic-button"]}`}>
        <h4>Скрыть</h4>
        <Image src="/ui/eye-closed.svg" alt="Скрыть" height={24} width={24} />
      </button>
    );
  }
  return;
}