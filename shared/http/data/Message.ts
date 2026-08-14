import type { MessageListItem } from "../../entities/Message.js";

export type CreateMessage = MessageListItem;

export type DeleteMessage = never;

export type GetMessages = MessageListItem[];