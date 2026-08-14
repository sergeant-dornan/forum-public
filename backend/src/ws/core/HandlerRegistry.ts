import type WebSocket from "ws";
import type MessageHandler from "./MessageHandler.js";

import type { Topic, WS } from "@forum/shared";
import TopicLoggedHandler from "./handlers/TopicLogged.js";
import MessageCreatedHandler from "./handlers/MessageCreated.js";
import MessageDeletedHandler from "./handlers/MessageDeleted.js";
import TopicCreatedHandler from "./handlers/TopicCreated.js";
import TopicDeletedHandler from "./handlers/TopicDeleted.js";
import TopicStatusToggledHandler from "./handlers/TopicStatusToggled.js";
import UserRoleToggledHandler from "./handlers/UserRoleToggled.js";

type HandlerConstructor = new (
  usersByTopicId: Map<Topic["topicId"], Set<WebSocket>>,
  allSockets: Set<WebSocket>
) => MessageHandler;

class HandlerRegistry {
  private handlers = new Map<WS.Core.Event, HandlerConstructor>();

  constructor() {
    this.register("topicLogged", TopicLoggedHandler);
    this.register("messageCreated", MessageCreatedHandler);
    this.register("messageDeleted", MessageDeletedHandler);
    this.register("topicCreated", TopicCreatedHandler);
    this.register("topicDeleted", TopicDeletedHandler);
    this.register("topicStatusToggled", TopicStatusToggledHandler);
    this.register("userRoleToggled", UserRoleToggledHandler);
  }

  private register(event: WS.Core.Event, handlerClass: HandlerConstructor): void {
    this.handlers.set(event, handlerClass);
  }

  public getHandler(event: WS.Core.Event): HandlerConstructor | undefined {
    return this.handlers.get(event);
  }
}

export default new HandlerRegistry();