import type { Message, Topic, TopicRole, User } from "../domain.types.js";
import type { MessageListItem } from "../entities/Message.js";
import type { TopicDetails } from "../entities/Topic.js";

export interface TopicLogged {
  topicId: Topic["topicId"];
  userId: User["userId"];
}

export interface MessageCreated {
  topicId: Topic["topicId"];
  message: MessageListItem;
}

export interface MessageDeleted {
  topicId: Topic["topicId"];
  messageId: Message["messageId"];
}

export interface TopicCreated {
  topic: TopicDetails;
}

export interface TopicDeleted {
  topicId: Topic["topicId"];
}

export interface TopicStatusToggled {
  topicId: Topic["topicId"];
  status: Topic["status"];
}

export interface UserRoleToggled {
  userId: User["userId"];
  topicId: Topic["topicId"];
  role: TopicRole["role"] | null;
}