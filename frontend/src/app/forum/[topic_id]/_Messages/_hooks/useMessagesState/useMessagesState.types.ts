import type { MessageListItem } from "@forum/shared/schemas";
import type useMessagesState from "./useMessagesState";

export type MessagesRecord = Record<MessageListItem["messageId"], MessageListItem>;

export type MessagesByDates = Record<string, MessageListItem[]>;

export type MessagesGroup = {
  date: string;
  messages: MessageListItem[];
};

export type MessagesReducerAction = {
  type: "ADD";
  payload: MessageListItem[] | MessageListItem;
} | {
  type: "DELETE";
  messageId: MessageListItem["messageId"];
};

export type UseMessagesStateReturnValue = ReturnType<typeof useMessagesState>;