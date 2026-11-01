import type { TopicListItem } from "@forum/shared/schemas";

export type TopicsRecord = Record<TopicListItem["topicId"], TopicListItem>;

type TopicWithStatus<T extends TopicListItem['status']> = Omit<TopicListItem, 'status'> & { status: T };

export type OpenTopic = TopicWithStatus<"open">
export type ClosedTopic = TopicWithStatus<"closed">
export type HiddenTopic = TopicWithStatus<"hidden">