"use client";
import type { TopicId, TopicRoleRecord } from "@forum/shared/schemas";
import { createContext, useContext, useState, type ReactNode } from 'react';
import { useTopicRolesWebSocket } from "./useTopicRolesWebSocket";

interface ITopicRolesContext {
  roles: TopicRoleRecord;
}

interface TopicRolesProviderProps {
  children: ReactNode;
  initialRoles: TopicRoleRecord;
  topicId: TopicId;
}

const TopicRolesContext = createContext<ITopicRolesContext | undefined>(undefined);

export function TopicRolesProvider({ children, initialRoles, topicId }: TopicRolesProviderProps) {
  const [roles, setRoles] = useState(initialRoles);

  // Работа с WebSocket
  useTopicRolesWebSocket(setRoles, topicId);

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