"use server";

import http from "@/shared/api/http/HttpClient";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import type { AppError } from "@/shared/utils/Error/Error.types";
import type { TopicId, TopicStatus } from "@forum/shared/schemas";

export async function deleteTopicAction(
  topicId: TopicId
): Promise<AppError | void> {
  const topicHttpClient = await http.server.createTopicClient();
  const result = await topicHttpClient.deleteTopic(topicId);
  if (isAppError(result)) return result;
  return result.data;
}

export async function changeTopicStatusAction(
  topicId: TopicId, status: TopicStatus
): Promise<AppError | TopicStatus> {
  const topicHttpClient = await http.server.createTopicClient();
  const result = await topicHttpClient.changeTopicStatus(topicId, status);
  if (isAppError(result)) return result;
  return result.data;
}