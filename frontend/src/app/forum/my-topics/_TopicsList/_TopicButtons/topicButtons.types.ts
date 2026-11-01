import type { TopicId, TopicStatus } from "@forum/shared/schemas";

export interface DeleteTopicButtonProps {
  topicId: TopicId;
}

export interface ChangeTopicStatusButtonProps {
  topicId: TopicId;
  status: TopicStatus;
}