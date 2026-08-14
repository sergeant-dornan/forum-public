"use server";

import http from "@/shared/api/http/HttpClient";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import type { Topic } from "@forum/shared";

export async function createMessageAction(message: string, topicId: Topic["topicId"]) {
  const messageHttpClient = await http.server.createMessageClient();
  const result = await messageHttpClient.createMessage(message, topicId);
  if (isAppError(result)) return result;
  return result.data;
}