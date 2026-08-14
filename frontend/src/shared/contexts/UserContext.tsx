"use client";

import ws from "@/shared/api/ws/WebSocketClient";
import { createContext, useContext, useEffect, type Dispatch, type ReactNode, type SetStateAction } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import http from "../api/http/HttpClient";
import type { UserContext as UserLocalStorageValue, WS } from "@forum/shared";
import { isAppError } from "../utils/Error/Error.guards";

interface IUserContext {
  user: UserLocalStorageValue | null;
  setUser: Dispatch<SetStateAction<UserLocalStorageValue | null>>;
  loading: boolean;
}

// Создаем контекст (Объект пользователя создается в authUtils!)
export const UserContext = createContext<IUserContext | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser, loading] = useLocalStorage<UserLocalStorageValue>("forum_user_fulsi", null);

  // При монтировании контекста получаем и обновляем роли пользователя
  useEffect(() => {
    if (!user || loading) return;
    let isMounted = true; // Флаг для предотвращения обновления после размонтирования

    const updateUserRoles = async () => {
      const userHttpClient = http.client.getUserClient();
      const result = await userHttpClient.getRoles();
      if (isAppError(result)) return;
      const roles = result.data;

      // Обновляем только если компонент все еще смонтирован
      if (!isMounted) return;

      setUser((prev) => {
        // Проверяем, что пользователь не изменился за время запроса
        if (prev?.userId !== user.userId) return prev;
        return { ...prev, roles };
      });
    }

    updateUserRoles();

    return () => {
      isMounted = false;
    };
  }, [user?.userId, loading])

  // Работа с WebSocket
  useEffect(() => {
    const userRoleToggledHandler = (data: WS.Data.UserRoleToggled) => {
      setUser((prev) => {
        if (!prev) return prev;
        // Если другой пользователь - ничего не меняем
        if (data.userId !== prev.userId) return prev;

        const newRoles = { ...prev.roles };

        if (data.role === null) {
          // Удаляем роль
          delete newRoles[data.topicId];
        } else {
          // Устанавливаем роль
          newRoles[data.topicId] = data.role;
        }

        return { ...prev, roles: newRoles };
      });
    }

    ws.on("userRoleToggled", userRoleToggledHandler);
    return () => ws.off("userRoleToggled", userRoleToggledHandler);
  }, [setUser]);

  // Данные для контекста
  const value = {
    user,
    setUser,
    loading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Хук для получения контекста
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Ошибка контекста");
  }
  return context;
}