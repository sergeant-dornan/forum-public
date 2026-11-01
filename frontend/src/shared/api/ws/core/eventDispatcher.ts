import type { Union } from "@forum/shared/ws";

export type EventHandler<T extends Union.Response["payload"]> = (payload: T) => void;

export type EventHandlerMap = {
  [K in Union.Response["event"]]: EventHandler<Extract<Union.Response, { event: K }>["payload"]>
} & {
  "connected": () => void;
  "disconnected": () => void;
  "unauthenticated": () => void;
}

class EventDispatcher {
  private listeners: {
    [K in keyof EventHandlerMap]?: EventHandlerMap[K][]
  } = {}; // Обработчики событий


  // Подписка на событие
  on<T extends keyof EventHandlerMap>(
    event: T, callback: EventHandlerMap[T]
  ): void {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }


  // Отменяет подписку
  off<T extends keyof EventHandlerMap>(
    event: T, callback: EventHandlerMap[T]
  ): void {
    const listeners = this.listeners[event];
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }


  // Уведомленият подписчиков на событие
  trigger(event: "connected" | "disconnected" | "unauthenticated"): void
  trigger(event: Union.Response["event"], payload: Union.Response["payload"]): void 
  trigger(event: Union.Response["event"] | "connected" | "disconnected" | "unauthenticated", payload?: Union.Response["payload"]): void {
    this.listeners[event]?.forEach((cb) => {
      if (typeof cb === "function")
        cb(payload as any)
    });
  }
}

export default new EventDispatcher();