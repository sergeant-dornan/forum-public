"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { setTopicRole } from "../user/userSlice";
import ws from "@/shared/api/ws/WebSocketClient";
import { addTopic, changeTopicStatus, deleteTopic } from "../topics/topicsSlice";
import type { ChangeTopicRole, ChangeTopicStatus, CreateTopic, DeleteTopic, DeleteTopicRole } from "@forum/shared/ws";

export default function useForumWebSocket(enabled: boolean) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.userId || !enabled) return;

    const topicRoleChangedHandler = (data: ChangeTopicRole.ResponsePayload) => {
      const { userId, topicId, role } = data;
      if (userId === user.userId) dispatch(setTopicRole({ topicId, role }));
    }

    const topicRoleDeletedHandler = (data: DeleteTopicRole.ResponsePayload) => {
      const { userId, topicId } = data;
      if (userId === user.userId) dispatch(setTopicRole({ topicId, role: null }));
    }

    const topicCreatedHandler = (data: CreateTopic.ResponsePayload) => {
      dispatch(addTopic(data));
    }

    const topicDeletedHandler = (data: DeleteTopic.ResponsePayload) => {
      dispatch(deleteTopic(data.topicId));
    }

    const topicStatusChangedHandler = (data: ChangeTopicStatus.ResponsePayload) => {
      dispatch(changeTopicStatus(data))
    }

    ws.on("topic:roleChanged", topicRoleChangedHandler);
    ws.on("topic:roleDeleted", topicRoleDeletedHandler);
    ws.on("topic:created", topicCreatedHandler);
    ws.on("topic:deleted", topicDeletedHandler);
    ws.on("topic:statusChanged", topicStatusChangedHandler);
    return () => {
      ws.off("topic:roleChanged", topicRoleChangedHandler);
      ws.off("topic:roleDeleted", topicRoleDeletedHandler);
      ws.off("topic:created", topicCreatedHandler);
      ws.off("topic:deleted", topicDeletedHandler);
      ws.off("topic:statusChanged", topicStatusChangedHandler);
    }
  }, [user.userId, enabled]);
}