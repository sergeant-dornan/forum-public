import type { TopicListItem } from "@forum/shared/schemas";
import type { ClosedTopic, HiddenTopic, OpenTopic } from "./topicTypes";

export function isOpenTopic(topic: TopicListItem): topic is OpenTopic {
  return topic.status === "open";
}

export function isClosedTopic(topic: TopicListItem): topic is ClosedTopic {
  return topic.status === "closed";
}

export function isHiddenTopic(topic: TopicListItem): topic is HiddenTopic {
  return topic.status === "hidden";
}