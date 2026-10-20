import type { ToDbType } from "@/shared/mappers/toDb.mapper.js";
import type { Category, Icon, Message, TopicRole, Topic, User, UserSession } from "../domain/common.domain.js";

export type CategoryDb = ToDbType<Category>
export type IconDb = ToDbType<Icon>
export type MessageDb = ToDbType<Message>
export type TopicRoleDb = ToDbType<TopicRole>
export type TopicDb = ToDbType<Topic>
export type UserSessionDb = ToDbType<UserSession>
export type UserDb = ToDbType<User>