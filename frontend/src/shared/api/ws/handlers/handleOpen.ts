import eventDispatcher from "../core/eventDispatcher";
import type { MessageQueue } from "../core/MessageQueue";
import type { ReconnectionManager } from "../core/ReconnectionManager";
import type { SocketState } from "../core/SocketState";

export function handleOpen(
  socket: WebSocket,
  socketState: SocketState,
  messageQueue: MessageQueue,
  reconnectionManager: ReconnectionManager
) {
  // Сокет мог быть заменён, пока шёл CONNECTING - игнорируем
  if (socketState.get() !== socket) return;
  if (socket.readyState !== WebSocket.OPEN) return;

  reconnectionManager.resetReconnection();
  messageQueue.sendQueueMessages(socket);
  eventDispatcher.trigger("connected");
}