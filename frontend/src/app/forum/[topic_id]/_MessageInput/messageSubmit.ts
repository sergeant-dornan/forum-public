"use client";

import ws from "@/shared/api/ws/WebSocketClient";
import type { SubmitEvent } from "react";
import { showError } from "@/shared/utils/Error/showError";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { toAppError } from "@/shared/utils/Error/toAppError";
import type { TopicId } from "@forum/shared/schemas";

export default async function messageSubmit(e: SubmitEvent, topicId: TopicId) {
  try {
    const formData = new FormData(e.target);
    const message = formData.get('message')?.toString().trim();

    if (!message || !topicId) return;
    if (message.length > 2000) throw ErrorFactory.userError(`Сообщение должно быть меньше 2000 символов (у вас ${message.length})`);

    ws.send.createMessage({ topicId, message });

    e.target.reset();
  }
  catch (error) {
    showError(toAppError(error));
  }
}