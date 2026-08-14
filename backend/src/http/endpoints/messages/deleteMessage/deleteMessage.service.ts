import type { Message, User } from "@forum/shared";
import { deleteMessage, getMessageDeletionPermissions } from "./deleteMessage.repository.js";
import { ClientError } from "@/shared/utils/ClientError.js";

export default async function deleteMessageService(
  messageId: Message["messageId"], userId: User["userId"]
): Promise<void> {
  const statusAndRole = await getMessageDeletionPermissions(userId, messageId);

  if (statusAndRole === undefined) {
    throw new ClientError("Сообщение не найдено", 404);
  }

  if (statusAndRole.status !== "open") {
    throw new ClientError("Удалять сообщения можно только в открытой теме", 403);
  }

  /* 
    Получаем айди пользователя и его роль в теме с этим сообщением
    Если пользователь сам написал сообщение, то он author. 
  */
  // Удалить, если достаточно прав
  if (statusAndRole.role === "admin" || statusAndRole.role === "author") {
    await deleteMessage(messageId);
  } else {
    throw new ClientError("Недостаточно прав", 403)
  }
}