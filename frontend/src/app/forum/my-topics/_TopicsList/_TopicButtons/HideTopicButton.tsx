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
import { isAppError } from "@/shared/utils/Error/Error.guards";
import { toAppError } from "@/shared/utils/Error/toAppError";

export default function HideTopicButton({ topicId, status }: ChangeTopicStatusButtonProps) {
  const { isConnected } = useForum();

  const toggleHandler = async (topicId: Topic["topicId"]) => {
    try {
      if (!isConnected) throw ErrorFactory.networkError();

      if (await confirmDialog("Скрыть тему?", "Скрытые темы не отображаются в навигации и не доступны для обсуждения")) {
        const result = await changeTopicStatusAction(topicId, "hidden");
        if (isAppError(result)) throw result;

        ws.notify.topicStatusToggled(topicId, result);
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