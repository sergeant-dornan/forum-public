import type { Topic, User } from "@forum/shared";
import { getTopicStatusInfo, updateTopicStatus } from "./changeTopicStatus.repository.js";
import { ClientError } from "@/shared/utils/ClientError.js";

export default async function hideTopicService(
  topicId: Topic["topicId"], userId: User["userId"]
): Promise<Topic["status"]> {
  const topicStatus = await getTopicStatusInfo(userId, topicId, "hidden");
  if (topicStatus === undefined)
    throw new ClientError("Доступно только автору", 403);

  // Уже спрятана - ничего не делаем
  if (topicStatus.status === "hidden") return "hidden";

  // Проверки пройдены
  const result = await updateTopicStatus(topicId, "hidden");
  if (result === undefined) throw new Error("result - undefined");
  return result;
}