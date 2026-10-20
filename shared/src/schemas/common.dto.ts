import z from "zod";

export const UserIdSchema = z.string().regex(/^\d+$/, "ID должен быть числом");
export type UserId = z.infer<typeof UserIdSchema>

export const CategoryIdSchema = z.string().regex(/^\d+$/, "ID должен быть числом");
export type CategoryId = z.infer<typeof CategoryIdSchema>

export const TopicIdSchema = z.string().regex(/^\d+$/, "ID должен быть числом");
export type TopicId = z.infer<typeof TopicIdSchema>

export const MessageIdSchema = z.string().regex(/^\d+$/, "ID должен быть числом");
export type MessageId = z.infer<typeof MessageIdSchema>

export const IconIdSchema = z.string().regex(/^\d+$/, "ID должен быть числом");
export type IconId = z.infer<typeof IconIdSchema>

export const TopicStatusSchema = z.enum(["open", "closed", "hidden"]);
export type TopicStatus = z.infer<typeof TopicStatusSchema>

export const TopicRoleSchema = z.enum(["admin", "banned"]);
export type TopicRole = z.infer<typeof TopicRoleSchema>