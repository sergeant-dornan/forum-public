import z from "zod";
import { CategoryIdSchema, TopicIdSchema, TopicRoleSchema, TopicStatusSchema, UserIdSchema } from "./common.dto.js";

export const TopicListItemSchema = z.object({
  topicId: TopicIdSchema,
  categoryId: CategoryIdSchema,
  userId: UserIdSchema,
  title: z.string(),
  createdAt: z.iso.datetime(),
  statusChangedAt: z.iso.datetime().nullable(),
  description: z.string(),
  status: TopicStatusSchema
});
export type TopicListItem = z.infer<typeof TopicListItemSchema>;

export const TopicDetailsSchema = TopicListItemSchema.extend({
  categoryTitle: z.string(),
  username: z.string(),
  src: z.string(),
  alt: z.string()
});
export type TopicDetails = z.infer<typeof TopicDetailsSchema>;

export const TopicRoleRecordSchema = z.record(UserIdSchema, TopicRoleSchema);
export type TopicRoleRecord = z.infer<typeof TopicRoleRecordSchema>;