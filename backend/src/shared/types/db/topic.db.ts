import type { ToDbType } from "@/shared/mappers/toDb.mapper.js";
import type { TopicDetails, TopicListItem, TopicRoleRecord } from "../domain/topic.domain.js";

export type TopicListItemDb = ToDbType<TopicListItem>

export type TopicDetailsDb = ToDbType<TopicDetails>

export type TopicRoleRecordDb = TopicRoleRecord