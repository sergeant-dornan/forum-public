import z from "zod";
import { TopicIdSchema, TopicRoleSchema, UserIdSchema } from "./common.dto.js";

export const UserRoleRecordSchema = z.record(TopicIdSchema, TopicRoleSchema);
export type UserRoleRecord = z.infer<typeof UserRoleRecordSchema>;

export const UserStateSchema = z.object({
  userId: UserIdSchema,
  username: z.string(),
  roles: UserRoleRecordSchema 
});
export type UserState = z.infer<typeof UserStateSchema>;