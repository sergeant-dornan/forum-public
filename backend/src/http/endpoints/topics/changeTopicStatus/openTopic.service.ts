import type { Topic, User } from "@forum/shared";
import { getTopicStatusInfo, updateTopicStatus } from "./changeTopicStatus.repository.js";
import { ClientError } from "@/shared/utils/ClientError.js";

export default async function openTopicService(
  topicId: Topic["topicId"], userId: User["userId"]
): Promise<Topic["status"]> {
  const topicStatus = await getTopicStatusInfo(userId, topicId, "open");
  if (topicStatus === undefined)
    throw new ClientError("Доступно только автору", 403);

  // Тема закрыта - открываем, если не превышен лимит
  if (topicStatus.status === "closed" && topicStatus.topicsWithStatusCount >= 5)
    throw new ClientError("Лимит открытых тем исчерпан", 403);

  // Уже открыта - ничего не делаем
  if (topicStatus.status === "open") return "open";

  // Проверки пройдены
  const result = await updateTopicStatus(topicId, "open");
  if (result === undefined) throw new Error("result - undefined");
  return result;
}