"use client";

import { setTopicRole } from "@/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ws from "@/shared/api/ws/WebSocketClient";
import type { CreateTopic, Error } from "@forum/shared/ws";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useCreateTopicWebSocket() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [ok, setOk] = useState(true);

  const userId = useAppSelector((state) => state.user.userId);

  useEffect(() => {
    // Обновляем роль пользователя и делаем редирект, когда тема успешно создана
    const topicCreatedHandler = (data: CreateTopic.ResponsePayload) => {
      if (data.userId !== userId) return;

      dispatch(setTopicRole({
        topicId: data.topicId,
        role: "admin"
      }));

      router.push(`/forum/${data.topicId}`);
    }

    const topicCreatedErrorHandler = (data: Error.ResponsePayload) => {
      setOk(false);
    }

    ws.on("topic:created", topicCreatedHandler);
    ws.on("error", topicCreatedErrorHandler);
    return () => {
      ws.off("topic:created", topicCreatedHandler);
      ws.off("error", topicCreatedErrorHandler);
    }
  }, [userId]);

  return { ok }
}