import type { TopicRolesRecord, Topic } from "@forum/shared";
import { getTopicRoles } from "./getTopicRoles.repository.js";
import { snakeToCamel } from "@/shared/utils/changeCaseUtils.js";

export default async function getTopicRolesService(
  topicId: Topic["topicId"]
) {
  const topicRolesArr = snakeToCamel(await getTopicRoles(topicId));

  // Преобразуем массив строк в объект
  const TopicRolesRecord: TopicRolesRecord = {};
  topicRolesArr.forEach(row => {
    TopicRolesRecord[row.userId] = row.role;
  });

  return TopicRolesRecord;
}