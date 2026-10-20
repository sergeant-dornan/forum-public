import { ReconnectionManager } from "./core/ReconnectionManager";
import eventDispatcher, { type EventHandlerMap } from "./core/eventDispatcher";
import { MessageSender } from "./core/MessageSender";
import { handleOpen } from "./handlers/handleOpen";
import { handleClose } from "./handlers/handleClose";
import { handleMessage } from "./handlers/handleMessage";
import { SocketState } from "./core/SocketState";
import { MessageQueue } from "./core/MessageQueue";
import type { Union } from "@forum/shared/ws";

/** 
 * Синглтон, в listeners хранятся все коллбеки, которые срабатывают при получении сообщений 
 * 
 * Не явные события: "connected", "disconnected", вызываются в onopen, onclose
 * Пример использования в компонентах:
 * ws.on("topicLogin", () => console.log(Вошёл в тему)) - callback срабатывает каждый раз, при получении события
*/
class WebSocketClient {
  private readonly socketState = new SocketState();
  private readonly messageQueue = new MessageQueue();
  private readonly reconnectionManager: ReconnectionManager;
  public send: MessageSender;

  constructor(private readonly url: string) {
    this.reconnectionManager = new ReconnectionManager(() => this.connect());
    this.send = new MessageSender((msg) => this.sendMessage(msg));
  }

  // Открывает/закрывает соединение, передает данные нужным обработчикам событий
  public connect() {
    if (this.socketState.isAlive) return;

    const socket = new WebSocket(this.url);
    this.socketState.set(socket);

    socket.onopen = () => handleOpen(socket, this.socketState, this.messageQueue, this.reconnectionManager);
    socket.onclose = (event: CloseEvent) => handleClose(event, socket, this.socketState, this.reconnectionManager);
    socket.onmessage = (event: MessageEvent<string>) => handleMessage(event, socket, this.socketState);
  }

  // Закрытие сокета
  public disconnect() {
    this.reconnectionManager.resetReconnection();

    this.socketState.get()?.close();
    this.socketState.set(null);
  }

  // Метод для подписки на получение дананых (при получении сообщения event вызывается коллбек)
  public on<T extends keyof EventHandlerMap & string>(event: T, callback: EventHandlerMap[T]) {
    eventDispatcher.on<T>(event, callback);
  }

  // Отменяет подписку
  public off<T extends keyof EventHandlerMap & string>(event: T, callback: EventHandlerMap[T]) {
    eventDispatcher.off<T>(event, callback);
  }

  private sendMessage(message: Union.Request) {
    const serialized = JSON.stringify(message);
    
    if (!this.socketState.isOpen) {
      this.messageQueue.add(serialized);
      return;
    }
    
    try {
      this.socketState.get()?.send(serialized);
    }
    catch (error) {
      console.error("Ошибка WS emit")
      this.messageQueue.add(serialized);
      this.socketState.get()?.close();
    }
  }

  public get isConnected() {
    return this.socketState.isOpen;
  }
}

if (process.env.NEXT_PUBLIC_PATH_TO_SOCKET_API === undefined)
  throw new Error("process.env.NEXT_PUBLIC_PATH_TO_SOCKET_API - undefined, заполните файл .env");

const ws = new WebSocketClient(process.env.NEXT_PUBLIC_PATH_TO_SOCKET_API);
export default ws;