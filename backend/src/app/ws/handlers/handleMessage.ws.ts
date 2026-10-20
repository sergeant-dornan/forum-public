import { messagesSockets } from "@/features/messages/messages.sockets.js";
import { topicsSockets } from "@/features/topics/topics.sockets.js";
import { parseWSMessage } from "@/shared/utils/parsers/parseWSMessage/parseWSMessage.js";
import { Union } from "@forum/shared/ws";
import type WebSocket from "ws";

type AnyHandler = (ws: WebSocket, request: Union.Request) => Promise<void>;

const socketHandlers = {
  ...messagesSockets,
  ...topicsSockets,
} as Record<Union.Request["event"], AnyHandler>;

export async function handleMessage(ws: WebSocket, data: WebSocket.RawData) {
  const message: unknown = JSON.parse(data.toString());

  const parsed = parseWSMessage(Union.RequestSchema, message);

  const handler = socketHandlers[parsed.event];
  if (!handler) throw new Error(`Неизвестное событие ${parsed.event}`);
  await handler(ws, parsed);
}