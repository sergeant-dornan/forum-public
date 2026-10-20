"use client"

import ws from "@/shared/api/ws/WebSocketClient";
import type { TopicId, TopicRoleRecord } from "@forum/shared/schemas";
import type { ChangeTopicRole, DeleteTopicRole } from "@forum/shared/ws";
import { useEffect, type Dispatch, type SetStateAction } from "react";

export function useTopicRolesWebSocket(setRoles: Dispatch<SetStateAction<TopicRoleRecord>>, topicId: TopicId) {
  useEffect(() => {
    const handleRoleChange = (data: ChangeTopicRole.ResponsePayload) => {
      // В нашей теме?
      if (data.topicId !== topicId) return;
      setRoles((prev) => {
        const newRoles = { ...prev };

        newRoles[data.userId] = data.role;

        return newRoles;
      })
    }

    const handleRoleDelete = (data: DeleteTopicRole.ResponsePayload) => {
      // В нашей теме?
      if (data.topicId !== topicId) return;
      setRoles((prev) => {
        const newRoles = { ...prev };

        delete newRoles[data.userId];

        return newRoles;
      })
    }

    ws.on("topic:roleChanged", handleRoleChange);
    ws.on("topic:roleDeleted", handleRoleDelete);
    return () => {
      ws.off("topic:roleChanged", handleRoleChange);
      ws.off("topic:roleDeleted", handleRoleDelete);
    }
  }, [setRoles, topicId]);
}