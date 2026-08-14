"use client"

import createTopicAction from "./action";
import ws from "@/shared/api/ws/WebSocketClient";
import { showError } from "@/shared/utils/Error/showError";
import { useForum } from "@/shared/contexts/ForumContext";
import { useRef, useState } from "react";
import { useUser } from "@/shared/contexts/UserContext";
import { useRouter } from "next/navigation";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import ErrorFactory from "@/shared/utils/Error/ErrorFactory";
import { toAppError } from "@/shared/utils/Error/toAppError";

export function useCreateTopic() {
  const { isConnected } = useForum();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittedRef = useRef(false);

  const { setUser } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      if (!isConnected) throw ErrorFactory.networkError();

      // Блокируем повторные отправки
      if (isSubmitting || submittedRef.current) return;

      setIsSubmitting(true);
      submittedRef.current = true;

      const createdTopic = await createTopicAction(formData);

      if (isAppError(createdTopic)) throw createdTopic;

      setUser((prev) => {
        if (!prev) return null
        return {
          ...prev,
          roles: {
            ...prev.roles,
            [createdTopic.topicId]: "admin"
          }
        };
      });

      ws.notify.topicCreated(createdTopic);
      router.push(`/forum/${createdTopic.topicId}`);
    }
    catch (error) {
      showError(toAppError(error));
      setIsSubmitting(false);
      submittedRef.current = false;
    }
  };

  return { isSubmitting, handleSubmit };
};