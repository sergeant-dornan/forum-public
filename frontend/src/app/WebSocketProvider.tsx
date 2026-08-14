"use client";

import { useEffect, type ReactNode } from "react";
import ws from "@/shared/api/ws/WebSocketClient";

// подключает пользователя к сокету
export default function WebSocketProvider({ children }: { children: ReactNode }) {
  // WebSocket
  useEffect(() => {
    ws.connect();

    return () => {
      ws.disconnect();
    }
  }, []);

  return children;
}