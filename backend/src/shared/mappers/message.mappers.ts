import type { MessageListItem } from "@/shared/types/domain/message.domain.js";

export function messageListItemArrayToResponse(input: MessageListItem[]) {
  return input.map((message) => ({
    messageId: message.messageId,
    textContent: message.textContent,
    createdAt: message.createdAt.toISOString(),
    userId: message.userId,
    username: message.username,
    src: message.src,
    alt: message.alt
  }));
}

export function messageListItemToResponse(input: MessageListItem) {
  return {
    messageId: input.messageId,
    textContent: input.textContent,
    createdAt: input.createdAt.toISOString(),
    userId: input.userId,
    username: input.username,
    src: input.src,
    alt: input.alt
  }
}