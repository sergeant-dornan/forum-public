import { WS } from "../index.js";

export type TopicLogged = WS.Core.MessageBase<"topicLogged", WS.Data.TopicLogged>;
export type MessageCreated = WS.Core.MessageBase<"messageCreated", WS.Data.MessageCreated>;
export type MessageDeleted = WS.Core.MessageBase<"messageDeleted", WS.Data.MessageDeleted>
export type TopicCreated = WS.Core.MessageBase<"topicCreated", WS.Data.TopicCreated>
export type TopicDeleted = WS.Core.MessageBase<"topicDeleted", WS.Data.TopicDeleted>
export type TopicStatusToggled = WS.Core.MessageBase<"topicStatusToggled", WS.Data.TopicStatusToggled>
export type UserRoleToggled = WS.Core.MessageBase<"userRoleToggled", WS.Data.UserRoleToggled>