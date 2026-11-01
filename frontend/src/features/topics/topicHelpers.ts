import type { ClosedTopic, HiddenTopic, OpenTopic } from "./topicTypes";
import { isClosedTopic, isHiddenTopic, isOpenTopic } from "./topicGuards";
import type { TopicListItem } from "@forum/shared/schemas";

export function isTopicMatches(topic: TopicListItem, query: string) {
  if (!query.trim()) return true;

  const searchTerm = query.trim();
  const regex = new RegExp(searchTerm, "i"); // "i" - регистронезависимый поиск

  return regex.test(topic.title) || regex.test(topic.description);
}

export function filterTopics(topics: TopicListItem[]) {
  const openTopics: OpenTopic[] = [];
  const closedTopics: ClosedTopic[] = [];
  const hiddenTopics: HiddenTopic[] = [];

  topics.forEach((topic) => {
    if (isOpenTopic(topic)) openTopics.push(topic);
    else if (isClosedTopic(topic)) closedTopics.push(topic);
    else if (isHiddenTopic(topic)) hiddenTopics.push(topic);
  });

  return { openTopics, closedTopics, hiddenTopics };
}