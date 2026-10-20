import { showError } from "@/shared/utils/Error/showError";
import { toAppError } from "@/shared/utils/Error/toAppError";
import { parseWsJsonSafely } from "@/shared/utils/parseJsonSafely/parseWsJsonSafely";
import wsErrorValidator from "../helpers/wsErrorValidator";
import eventDispatcher from "../core/eventDispatcher";
import type { SocketState } from "../core/SocketState";

export function handleMessage(
  event: MessageEvent<string>,
  socket: WebSocket,
  socketState: SocketState
) {
  // Игноирование события старого сокета
  if (socketState.get() !== socket) return;

  const json: unknown = JSON.parse(event.data);

  const parsed = parseWsJsonSafely(json);
  if (parsed instanceof Error) {
    showError(toAppError(parsed));
    return;
  }
  if (parsed.event === "error") showError(wsErrorValidator.validate(parsed));
  eventDispatcher.trigger(parsed.event, parsed.payload);
}