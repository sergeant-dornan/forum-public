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

export default function OpenTopicButton({ topicId, status }: ChangeTopicStatusButtonProps) {
  const { isConnected } = useApp();

  const openHandler = async (topicId: TopicId) => {
    try {
      if (!isConnected) throw ErrorFactory.networkError();

      if (await confirmDialog("Открыть тему?", "Открытые темы отображаются в навигации и доступны для обсуждения")) {
        ws.send.changeTopicStatus({ topicId, status: "open" });
      }
    }
    catch (error) {
      showError(toAppError(error));
    }
  }

  if (status === "open") return;
  if (status === "closed") {
    return (
      <button onClick={() => openHandler(topicId)} className={`grey rounded ${styles["topic-button"]}`}>
        <h4>Открыть</h4>
        <Image src="/ui/lock-open.svg" alt="Открыть" height={24} width={24} />
      </button>
    );
  }
  return (
    <button onClick={() => openHandler(topicId)} className={`grey rounded ${styles["topic-button"]}`}>
      <h4>Показать открытой</h4>
      <Image src="/ui/lock-open.svg" alt="Открыть" height={24} width={24} />
    </button>
  );
}