import socketStore from "@/app/ws/core/socketStore.ws.js";
import changeTopicRoleService from "./changeTopicRole.service.js";
import { ClientError } from "@/shared/utils/CustomErrors.js";
import type WebSocket from "ws";
import type { ChangeTopicRole } from "@forum/shared/ws";

export default async function changeTopicRoleSocket(
  ws: WebSocket, request: ChangeTopicRole.Request
): Promise<void> {
  const context = socketStore.contexts.get(ws);
  if (!context) throw new ClientError("Не авторизован", 401);
  const { userId: actorUserId } = context;
  const { topicId, newRole, targetUserId } = request.payload;

  const settedRole = await changeTopicRoleService(topicId, newRole, targetUserId, actorUserId);

  socketStore.broadcastToAll({
    event: "topic:roleChanged",
    payload: {
      userId: targetUserId,
      topicId,
      role: settedRole
    }
  })
}