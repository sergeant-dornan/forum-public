import type { TopicDetails, TopicListItem, TopicRolesRecord } from "../../entities/Topic.js"
import type { Topic, TopicRole } from "../../domain.types.js";

export type ChangeTopicStatus = Topic["status"];

export type ChangeUserRole = TopicRole["role"];

export type CreateTopic = TopicDetails;

export type DeleteTopic = never;

export type DeleteUserRole = never;

export type GetSimilarTopics = TopicListItem[];

export type GetTopic = TopicDetails;

export type GetTopicRoles = TopicRolesRecord;

export type GetTopics = TopicListItem[];

export type SearchTopic = TopicListItem[];