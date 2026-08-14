import type { Icon, Message, User } from "../domain.types.js";

export type MessageListItem = {
  messageId: Message["messageId"];
  textContent: Message["textContent"];
  createdAt: Message["createdAt"];
  userId: User["userId"];
  username: User["username"];
  src: Icon["src"];
  alt: Icon["alt"];
}