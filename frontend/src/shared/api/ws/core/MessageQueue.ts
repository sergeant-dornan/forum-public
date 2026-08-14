export class MessageQueue {
  private queue: string[] = []; // Очередь сообщений, которые не отправились из-за закрытого сокета

  add(message: string) {
    this.queue.push(message);
  }

  sendQueueMessages(socket: WebSocket) {
    this.queue.forEach(msg => socket.send(msg));
    this.queue = [];
  }
}