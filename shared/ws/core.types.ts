import type { MessageCreated, MessageDeleted, TopicCreated, TopicDeleted, TopicLogged, TopicStatusToggled, UserRoleToggled } from "./data.types.js";

export type MessageMap = {
  topicLogged: TopicLogged;
  messageCreated: MessageCreated;
  messageDeleted: MessageDeleted;
  topicCreated: TopicCreated;
  topicDeleted: TopicDeleted;
  topicStatusToggled: TopicStatusToggled;
  userRoleToggled: UserRoleToggled;
};

export type Event = keyof MessageMap & string;
export type Data = MessageMap[keyof MessageMap]
export type Message = {
  [K in keyof MessageMap]: {
    event: K;
    data: MessageMap[K];
  };
}[keyof MessageMap];

export type MessageBase<T extends Event, K extends Data> = {
  event: T;
  data: K;
}