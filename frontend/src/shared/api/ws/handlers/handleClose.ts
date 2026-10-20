import eventDispatcher from "../core/eventDispatcher";
import { shouldReconnect } from "../helpers/shouldReconnect";
import type { ReconnectionManager } from "../core/ReconnectionManager";
import type { SocketState } from "../core/SocketState";

export function handleClose(
  event: CloseEvent,
  socket: WebSocket,
  socketState: SocketState,
  reconnectionManager: ReconnectionManager,
) {
  // Закрылся СТАРЫЙ сокет - не трогаем state
  if (socketState.get() !== socket) return;

  socketState.set(null);

  if (event.code === 4401) {
    eventDispatcher.trigger("unauthenticated");
    return;
  }

  if (shouldReconnect(event)) reconnectionManager.scheduleReconnect();
  eventDispatcher.trigger("disconnected");
}