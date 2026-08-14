import type WebSocket from "ws";
import MessageHandler from "../MessageHandler.js";
import type { WS } from "@forum/shared";

export default class TopicDeletedHandler extends MessageHandler {
  async handle(ws: WebSocket, data: WS.Data.TopicDeleted) {
    const { topicId } = data;

    this.brodcastToAll<WS.Message.TopicDeleted>({
      event: "topicDeleted", 
      data: { topicId }
    })
  }
}