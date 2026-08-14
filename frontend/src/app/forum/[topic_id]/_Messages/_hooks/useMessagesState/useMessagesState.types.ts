import type { MessageListItem } from "@forum/shared";

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

export interface UseMessagesStateReturnValue {
  messagesGroups: MessagesGroup[];
  messagesDispatch: (action: MessagesReducerAction) => void;
  lastMessageId: MessageListItem["messageId"] | undefined;
};