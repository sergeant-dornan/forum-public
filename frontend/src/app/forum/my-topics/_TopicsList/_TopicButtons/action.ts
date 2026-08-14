"use server";

import http from "@/shared/api/http/HttpClient";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import type { AppError } from "@/shared/utils/Error/Error.types";
import type { Topic } from "@forum/shared";

export async function deleteTopicAction(
  topicId: Topic["topicId"]
): Promise<AppError | undefined> {
  const topicHttpClient = await http.server.createTopicClient();
  const result = await topicHttpClient.deleteTopic(topicId);
  if (isAppError(result)) return result;
  return result.data;
}

export async function changeTopicStatusAction(
  topicId: Topic["topicId"], status: Topic["status"]
): Promise<AppError | Topic["status"]> {
  const topicHttpClient = await http.server.createTopicClient();
  const result = await topicHttpClient.changeTopicStatus(topicId, status);
  if (isAppError(result)) return result;
  return result.data;
}