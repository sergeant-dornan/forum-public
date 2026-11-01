"use client";

import { useEffect, type ReactNode } from "react";
import ws from "@/shared/api/ws/WebSocketClient";
import { useAppSelector } from "@/lib/hooks";

// подключает пользователя к сокету
export default function WebSocketProvider({ children }: { children: ReactNode }) {
  const userId = useAppSelector((state) => state.user.userId);

  // WebSocket
  useEffect(() => {
    if (!userId) return;
    ws.connect();

    return () => {
      ws.disconnect();
    }
  }, [userId]);

  return children;
}