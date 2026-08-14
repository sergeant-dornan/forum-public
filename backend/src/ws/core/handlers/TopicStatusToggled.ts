import type WebSocket from "ws";
import MessageHandler from "../MessageHandler.js"
import type { WS } from "@forum/shared";

export default class TopicStatusToggledHandler extends MessageHandler {
  async handle(ws: WebSocket, data: WS.Data.TopicStatusToggled) {
    const { topicId, status } = data;

    this.brodcastToAll<WS.Message.TopicStatusToggled>({
      event: "topicStatusToggled",
      data: {
        topicId,
        status
      }
    });
  }
}