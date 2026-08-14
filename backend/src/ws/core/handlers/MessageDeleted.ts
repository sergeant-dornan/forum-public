import type WebSocket from "ws";
import MessageHandler from "../MessageHandler.js";
import type { WS } from "@forum/shared";

export default class MessageDeletedHandler extends MessageHandler {
  async handle(ws: WebSocket, data: WS.Data.MessageDeleted) {
    const { topicId, messageId } = data;

    this.broadcastToTopicUsers<WS.Message.MessageDeleted>(topicId, {
      event: "messageDeleted",
      data: {
        messageId,
        topicId
      }
    });
  }
}