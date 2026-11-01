import type { TopicRole, User } from "./common.domain.js";

export type UserRoleRecord = Record<TopicRole["topicId"], TopicRole["role"]>

export interface UserState {
  userId: User["userId"];
  username: User["username"];
  roles: UserRoleRecord; 
}