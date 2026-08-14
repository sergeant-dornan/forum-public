import type { TopicRole } from "../domain.types.js";

export type UserRole = Record<TopicRole["topicId"], TopicRole["role"]>;