"use client";

import ws from "@/shared/api/ws/WebSocketClient";
import { createMessageAction } from "./action";
import type { SubmitEvent } from "react";
import type { Topic } from "@forum/shared";
import { showError } from "@/shared/utils/Error/showError";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import { toAppError } from "@/shared/utils/Error/toAppError";

export default async function messageSubmit(e: SubmitEvent, topicId: Topic["topicId"]) {
  try {
    const formData = new FormData(e.target);
    const message = formData.get('message')?.toString().trim();

    if (!message || !topicId) return;
    if (message.length > 2000) throw ErrorFactory.userError(`Сообщение должно быть меньше 2000 символов (у вас ${message.length})`);

    const createdMessage = await createMessageAction(message, topicId);
    if (isAppError(createdMessage)) throw createdMessage;

    ws.notify.messageCreated(topicId, createdMessage);

    e.target.reset();
  }
  catch (error) {
    showError(toAppError(error));
  }
}