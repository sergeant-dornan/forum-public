import type { WS } from "@forum/shared";

export type EventHandler<T extends WS.Core.Data> = (data: T) => void;

export type EventHandlerMap = {
  [K in WS.Core.Event]: EventHandler<WS.Core.MessageMap[K]>
} & {
  "connected": () => void;
  "disconnected": () => void;
}

export class EventDispatcher {
  private listeners: {
    [K in keyof EventHandlerMap]?: EventHandlerMap[K][]
  } = {}; // Обработчики событий


  // Подписка на событие
  on<T extends keyof EventHandlerMap & string>(
    event: T, callback: EventHandlerMap[T]
  ): void {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }


  // Отменяет подписку
  off<T extends keyof EventHandlerMap & string>(
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
  trigger(event: "connected" | "disconnected"): void
  trigger(event: WS.Core.Event, data: WS.Core.Data): void 
  trigger(event: WS.Core.Event | "connected" | "disconnected", data?: WS.Core.Data): void {
    this.listeners[event]?.forEach((cb) => {
      if (typeof cb === "function")
        cb(data as any)
    });
  }
}