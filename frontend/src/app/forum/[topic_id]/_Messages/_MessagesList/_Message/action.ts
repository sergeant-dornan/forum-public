"use server";

import http from "@/shared/api/http/HttpClient";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import type { MessageListItem, TopicDetails } from "@forum/shared";

export async function deleteMessageAction(messageId: MessageListItem["messageId"]) {
  const messageHttpClient = await http.server.createMessageClient();
  const result = await messageHttpClient.deleteMessage(messageId);
  if (isAppError(result)) return result;
  return result.data;
}

export async function banUserAction(topicId: TopicDetails["topicId"], userId: MessageListItem["userId"]) {
  const topicHttpClient = await http.server.createTopicClient();
  const result = await topicHttpClient.changeUserRole(topicId, userId, "banned");
  if (isAppError(result)) return result;
  return result.data;
}

export async function unbanUserAction(topicId: TopicDetails["topicId"], userId: MessageListItem["userId"]) {
  const topicHttpClient = await http.server.createTopicClient();
  const result = await topicHttpClient.deleteUserRole(topicId, userId);
  if (isAppError(result)) return result;
  return result.data;
}