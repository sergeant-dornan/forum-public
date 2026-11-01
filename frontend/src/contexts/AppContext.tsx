"use client";
import ws from "@/shared/api/ws/WebSocketClient";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface IAppContext {
  isConnected: boolean;
}

// Создаем контекст, нужен для хранения общих форумных переменных
const AppContext = createContext<IAppContext | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);

  const [wsConnected, setWsConnected] = useState(ws.isConnected ?? false);
  const [browserConnected, setBrowserConnected] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    setIsConnected(wsConnected && browserConnected);
  }, [wsConnected, browserConnected]);

  useEffect(() => {
    // Сохраняем ссылки на обработчики
    const handleWsConnected = () => setWsConnected(true);
    const handleWsDisconnected = () => setWsConnected(false);
    const handleBrowserOnline = () => setBrowserConnected(true);
    const handleBrowserOffline = () => setBrowserConnected(false);

    window.addEventListener("online", handleBrowserOnline);
    window.addEventListener("offline", handleBrowserOffline);
    ws.on("connected", handleWsConnected);
    ws.on("disconnected", handleWsDisconnected);

    return () => {
      window.removeEventListener("online", handleBrowserOnline);
      window.removeEventListener("offline", handleBrowserOffline);
      ws.off("connected", handleWsConnected);
      ws.off("disconnected", handleWsDisconnected);
    };
  }, []);

  // Данные для контекста
  const value = {
    isConnected
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Хук для получения контекста
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("Ошибка контекста");
  return context;
}