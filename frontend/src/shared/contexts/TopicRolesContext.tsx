"use client";
import ws from "@/shared/api/ws/WebSocketClient";
import type { Topic, TopicRolesRecord, WS } from "@forum/shared";
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface ITopicRolesContext {
  roles: TopicRolesRecord;
}

interface TopicRolesProviderProps {
  children: ReactNode;
  initialRoles: TopicRolesRecord;
  topicId: Topic["topicId"];
}

const TopicRolesContext = createContext<ITopicRolesContext | undefined>(undefined);

export function TopicRolesProvider({ children, initialRoles, topicId }: TopicRolesProviderProps) {
  const [roles, setRoles] = useState(initialRoles);

  // Работа с WebSocket
  useEffect(() => {
    const handleRoleChange = (data: WS.Data.UserRoleToggled) => {
      // В нашей теме?
      if (data.topicId !== topicId) return;
      setRoles((prev) => {
        const newRoles = { ...prev };

        if (data.role === null) 
          delete newRoles[data.userId];
        else 
          newRoles[data.userId] = data.role;

        return newRoles;
      })
    }

    ws.on("userRoleToggled", handleRoleChange);
    return () => ws.off("userRoleToggled", handleRoleChange);
  }, [topicId]);

  return (
    <TopicRolesContext.Provider value={{ roles }}>
      {children}
    </TopicRolesContext.Provider>
  );
}

export function useTopicRoles() {
  const context = useContext(TopicRolesContext);
  if (!context) {
    throw new Error("Ошибка контекста");
  }
  return context;
}