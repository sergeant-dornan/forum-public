import type { Category, Icon, TopicRole, Topic, User } from "../domain.types.js";

export interface TopicListItem {
  topicId: Topic["topicId"];
  userId: Topic["userId"];
  title: Topic["title"];
  createdAt: Topic["createdAt"];
  statusChangedAt: Topic["statusChangedAt"];
  description: Topic["description"];
  status: Topic["status"];
  categoryId: Topic["categoryId"];
}

export type TopicDetails = TopicListItem & {
  categoryTitle: Category["title"];
  username: User["username"];
  src: Icon["src"];
  alt: Icon["alt"];
}

export type TopicRolesRecord = Record<
  TopicRole["userId"], 
  TopicRole["role"]
>