import type { Category, Icon, Message, TopicRole, Topic, User, UserSession } from "@forum/shared"
import type { CamelToSnakeInterface } from "../utils/changeCaseUtils.js"

export type CategoryDB = CamelToSnakeInterface<Category>
export type IconDB = CamelToSnakeInterface<Icon>
export type MessageDB = CamelToSnakeInterface<Message>
export type TopicRoleDB = CamelToSnakeInterface<TopicRole>
export type TopicDB = CamelToSnakeInterface<Topic>
export type UserSessionDB = CamelToSnakeInterface<UserSession>
export type UserDB = CamelToSnakeInterface<User>