import type { Topic } from "@forum/shared";

export interface DeleteTopicButtonProps {
  topicId: Topic["topicId"];
}

export interface ChangeTopicStatusButtonProps {
  topicId: Topic["topicId"];
  status: Topic["status"];
}