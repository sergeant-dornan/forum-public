import type { WS } from "@forum/shared";
import { ReconnectionManager } from "./core/ReconnectionManager";
import { EventDispatcher, type EventHandlerMap } from "./core/EventDispatcher";
import { MessageQueue } from "./core/MessageQueue";
import { NotifyHandlers } from "./core/NotifyHandlers";
import { parseJsonWithDates } from "@/shared/utils/parseJsonWithDates";
import { showError } from "@/shared/utils/Error/showError";
import { toAppError } from "@/shared/utils/Error/toAppError";

/** 
 * Синглтон, в listeners хранятся все коллбеки, которые срабатывают при получении сообщений 
 * 
 * Не явные события: "connected", "disconnected", вызываются в onopen, onclose
 * Пример использования в компонентах:
 * ws.on("topicLogin", () => console.log(Вошёл в тему)) - callback срабатывает каждый раз, при получении события
*/
class WebSocketClient {
  private socket: WebSocket | null = null;

  private reconnectionManager: ReconnectionManager;
  private eventDispatcher: EventDispatcher;
  private messageQueue: MessageQueue;

  public notify: NotifyHandlers;

  constructor(private readonly url: string) {
    this.reconnectionManager = new ReconnectionManager(() => this.connect());
    this.eventDispatcher = new EventDispatcher();
    this.messageQueue = new MessageQueue();
    this.notify = new NotifyHandlers(this.emit.bind(this));
  }

  // Открывает/закрывает соединение, передает данные нужным обработчикам событий
  public connect() {
    if (this.socket?.readyState === WebSocket.OPEN) return;
    if (this.socket?.readyState === WebSocket.CONNECTING) return;

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.reconnectionManager.resetReconnection();

      const socket = this.socket;
      if (socket) this.messageQueue.sendQueueMessages(socket);

      this.eventDispatcher.trigger("connected");
    }

    this.socket.onclose = () => {
      this.socket = null;
      this.reconnectionManager.scheduleReconnect();
      this.eventDispatcher.trigger("disconnected");
    }

    this.socket.onmessage = async (messageEvent: MessageEvent<string>) => {
      const message = await parseJsonWithDates<WS.Core.Message>(messageEvent.data);
      if (message instanceof Error) {
        showError(toAppError(message));
        return;
      }
      this.eventDispatcher.trigger(message.event, message.data);
    }
  }

  // Метод для подписки на получение дананых (при получении сообщения event вызывается коллбек)
  on<T extends keyof EventHandlerMap & string>(
    event: T, callback: EventHandlerMap[T]
  ): void {
    this.eventDispatcher.on<T>(event, callback);
  }

  // Отменяет подписку
  off<T extends keyof EventHandlerMap & string>(
    event: T, callback: EventHandlerMap[T]
  ): void {
    this.eventDispatcher.off<T>(event, callback);
  }

  // Отправляет сообщение и данные из объекта data на сервер
  emit<T extends WS.Core.Event>(event: T, data: WS.Core.MessageMap[T]) {
    const message = JSON.stringify({ event, data });
    if (this.socket?.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(message);
      }
      catch (error) {
        console.log("Ошибка WS emit")
        this.messageQueue.add(message);
        this.reconnectionManager.scheduleReconnect();
      }
    }
    else {
      this.messageQueue.add(message);
    }
  }

  // Закрытие сокета
  public disconnect() {
    this.reconnectionManager.resetReconnection();
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  public get isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}

if (process.env.NEXT_PUBLIC_PATH_TO_SOCKET_API === undefined)
  throw new Error("process.env.NEXT_PUBLIC_PATH_TO_SOCKET_API - undefined, заполните файл .env");

const ws = new WebSocketClient(process.env.NEXT_PUBLIC_PATH_TO_SOCKET_API);
export default ws;