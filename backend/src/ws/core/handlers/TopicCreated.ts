import type WebSocket from "ws";
import MessageHandler from "../MessageHandler.js";
import type { WS } from "@forum/shared";

export default class TopicCreatedHandler extends MessageHandler {
  async handle(ws: WebSocket, data: WS.Data.TopicCreated) {
    const { topic } = data;

    this.brodcastToAll<WS.Message.TopicCreated>({
      event: "topicCreated",
      data: {
        topic
      }
    });
  }
}