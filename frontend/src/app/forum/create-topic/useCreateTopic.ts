"use client"

import { showError } from "@/shared/utils/Error/showError";
import { useApp } from "@/contexts/AppContext";
import { useEffect, useState } from "react";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { toAppError } from "@/shared/utils/Error/toAppError";
import { createTopicHandler } from "./createTopicHandler";
import { useCreateTopicWebSocket } from "./useCreateTopicWebSocket";

export function useCreateTopic() {
  const { isConnected } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Узнаем о создании темы через WebSocket
  const state = useCreateTopicWebSocket();

  useEffect(() => {
    if (!state.ok) setIsSubmitting(false);
  }, [state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      if (!isConnected) throw ErrorFactory.networkError();

      // Блокируем повторные отправки
      if (isSubmitting) return;

      setIsSubmitting(true);

      const result = await createTopicHandler(formData);
      if (isAppError(result)) throw result;
    }
    catch (error) {
      showError(toAppError(error));
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handleSubmit };
};