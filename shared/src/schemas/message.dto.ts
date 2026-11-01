import z from "zod";
import { MessageIdSchema, UserIdSchema } from "./common.dto.js";

export const MessageListItemSchema = z.object({
    messageId: MessageIdSchema,
    textContent: z.string(),
    createdAt: z.iso.datetime(),
    userId: UserIdSchema,
    username: z.string(),
    src: z.string(),
    alt: z.string()
});
export type MessageListItem = z.infer<typeof MessageListItemSchema>;