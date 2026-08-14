import type WebSocket from "ws";
import MessageHandler from "../MessageHandler.js";
import type { WS } from "@forum/shared";

export default class UserRoleToggledHandler extends MessageHandler {
  async handle(ws: WebSocket, data: WS.Data.UserRoleToggled) {
    const { userId, role, topicId } = data;

    this.brodcastToAll<WS.Message.UserRoleToggled>({
      event: "userRoleToggled",
      data: {
        userId,
        topicId,
        role
      }
    });
  }
}