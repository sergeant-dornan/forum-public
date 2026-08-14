import type { WS } from "@forum/shared";
import MessageHandler from "../MessageHandler.js";
import type WebSocket from "ws";

export default class MessageCreatedHandler extends MessageHandler {
  async handle(ws: WebSocket, data: WS.Data.MessageCreated): Promise<void> {
    const { topicId, message } = data;

    this.broadcastToTopicUsers<WS.Message.MessageCreated>(topicId, {
      event: "messageCreated",
      data: {
        message,
        topicId
      }
    });
  }
}