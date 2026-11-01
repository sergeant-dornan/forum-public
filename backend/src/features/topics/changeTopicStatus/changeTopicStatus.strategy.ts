import type { Topic } from "@/shared/types/domain/common.domain.js";
import { ClientError } from "@/shared/utils/CustomErrors.js";
import openTopicService from "./openTopic.service.js";
import hideTopicService from "./hideTopic.service.js";
import closeTopicService from "./closeTopic.service.js";

export default async function changeTopicStatusStrategy(
  topicId: Topic["topicId"], userId: Topic["userId"], status: Topic["status"]
): Promise<Topic["status"]> {
  switch (status) {
    case "closed":
      return await closeTopicService(topicId, userId);
    case "hidden":
      return await hideTopicService(topicId, userId);
    case "open":
      return await openTopicService(topicId, userId);
    default:
      throw new ClientError(`Неизвестный статус темы: ${status}`, 400);
  }
}