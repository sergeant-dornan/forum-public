import type { ChangeTopicRole, ChangeTopicStatus, CreateMessage, CreateTopic, DeleteMessage, DeleteTopic, DeleteTopicRole, JoinTopic, Union } from "@forum/shared/ws";

export class MessageSender {
  constructor(private send: (message: Union.Request) => void) { }

  // Сообщить серверу о вхождении пользователя в тему
  joinTopic(payload: JoinTopic.RequestPayload) {
    this.send({ event: "topic:join", payload });
  }

  createMessage(payload: CreateMessage.RequestPayload) {
    this.send({ event: "message:create", payload });
  }

  deleteMessage(payload: DeleteMessage.RequestPayload) {
    this.send({ event: "message:delete", payload });
  }

  createTopic(payload: CreateTopic.RequestPayload) {
    this.send({ event: "topic:create", payload });
  }

  deleteTopic(payload: DeleteTopic.RequestPayload) {
    this.send({ event: "topic:delete", payload });
  }

  changeTopicStatus(payload: ChangeTopicStatus.RequestPayload) {
    this.send({ event: "topic:changeStatus", payload });
  }

  changeTopicRole(payload: ChangeTopicRole.RequestPayload) {
    this.send({ event: "topic:changeRole", payload });
  }

  deleteTopicRole(payload: DeleteTopicRole.RequestPayload) {
    this.send({ event: "topic:deleteRole", payload });
  }
}