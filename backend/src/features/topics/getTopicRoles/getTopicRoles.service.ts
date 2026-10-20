import type { Topic } from "@/shared/types/domain/common.domain.js";
import { getTopicRoles } from "./getTopicRoles.repository.js";
import type { TopicRoleRecord } from "@/shared/types/domain/topic.domain.js";
import { fromDb } from "@/shared/mappers/fromDb.mapper.js";

export default async function getTopicRolesService(
  topicId: Topic["topicId"]
) {
  const topicRolesArr = fromDb(await getTopicRoles(topicId));

  // Преобразуем массив строк в объект
  const TopicRoleRecord: TopicRoleRecord = {};
  topicRolesArr.forEach(row => {
    TopicRoleRecord[row.userId] = row.role;
  });

  return TopicRoleRecord;
}