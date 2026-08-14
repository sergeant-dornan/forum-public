import type { Message, MessageListItem, Topic, TopicDetails, TopicRole, User, WS } from "@forum/shared";

export class NotifyHandlers {
  constructor(
    private emit: <T extends WS.Core.Event>(event: T, data: WS.Core.MessageMap[T]) => void
  ) { }
  
  // Ф-ия отправки пользователя, вошедшего в тему
  topicLogged(topicId: Topic["topicId"], userId: User["userId"]) {
    this.emit("topicLogged", { topicId, userId });
  }

  // Ф-ия отправки сообщения на сервер
  messageCreated(topicId: Message["topicId"], message: MessageListItem) {
    this.emit("messageCreated", { topicId, message });
  }

  // Ф-ия удаления сообщения с сервера
  messageDeleted(topicId: Message["topicId"], messageId: Message["messageId"]) {
    this.emit("messageDeleted", { topicId, messageId });
  }

  // Ф-ия оповещения, что тема создана
  topicCreated(topic: TopicDetails) {
    this.emit("topicCreated", { topic });
  }

  // Ф-ия для удаления темы
  topicDeleted(topicId: Topic["topicId"]) {
    this.emit("topicDeleted", { topicId })
  }

  // Ф-ия для смены статуса темы
  topicStatusToggled(topicId: Topic["topicId"], status: Topic["status"]) {
    this.emit("topicStatusToggled", { topicId, status });
  }

  // Ф-ия оповещения о смене роли пользователя
  userRoleToggled(userId: TopicRole["userId"], topicId: TopicRole["topicId"], role: TopicRole["role"] | null) {
    this.emit("userRoleToggled", { userId, topicId, role });
  }
}