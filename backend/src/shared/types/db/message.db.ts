import type { ToDbType } from "@/shared/mappers/toDb.mapper.js";
import type { MessageListItem } from "../domain/message.domain.js";

export type MessageListItemDb = ToDbType<MessageListItem>