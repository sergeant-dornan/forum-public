import type WebSocket from "ws";
import socketStore from "../core/socketStore.ws.js";
import { getSessionId } from "@/shared/utils/authUtils/authUtils.js";
import { getUserIdBySessionId } from "@/features/auth/checkSession/checkSession.repository.js";
import type { IncomingMessage } from "http";

export async function handleHandshake(ws: WebSocket, req: IncomingMessage): Promise<boolean> {
  const sessionId = getSessionId(req);
  if (!sessionId) {
    ws.close(4401, "Не аутентифицирован");
    return false;
  }

  const userId = await getUserIdBySessionId(sessionId);
  if (!userId) {
    ws.close(4401, "Не аутентифицирован");
    return false;
  }

  socketStore.contexts.set(ws, { userId });
  socketStore.allSockets.add(ws);
  return true;
}