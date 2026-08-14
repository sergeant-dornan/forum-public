import type { Topic, User } from "@forum/shared";
import { getTopicStatusInfo, updateTopicStatus } from "./changeTopicStatus.repository.js";
import { ClientError } from "@/shared/utils/ClientError.js";

export default async function closeTopicService(
  topicId: Topic["topicId"], userId: User["userId"]
): Promise<Topic["status"]> {
  const topicStatus = await getTopicStatusInfo(userId, topicId, "closed");
  if (topicStatus === undefined)
    throw new ClientError("Доступно только автору", 403);

  // Тема открыта - закрываем, если не превышен лимит
  if (topicStatus.status === "open" && topicStatus.topicsWithStatusCount >= 5)
    throw new ClientError("Лимит закрытых тем исчерпан", 403);

  // Тема закрыта - ничего не меняем
  if (topicStatus.status === "closed") return "closed";

  // Проверки пройдены
  const result = await updateTopicStatus(topicId, "closed");
  if (result === undefined) throw new Error("result - undefined");
  return result;
}