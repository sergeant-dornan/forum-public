"use client";

import ws from "@/shared/api/ws/WebSocketClient";
import { confirmDialog, showErrorMessage } from "@/shared/utils/swalUtils";
import styles from "./logout-button.module.css";
import { useUser } from "@/shared/contexts/UserContext";
import { useRouter } from "next/navigation";
import { logoutAction } from "./action";
import { useState } from "react";
import { isAppError } from "@/shared/utils/Error/Error.guards";

export default function LogoutButton() {
  const { setUser, loading } = useUser();
  const router = useRouter();

  // Защита от двойного клика
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const buttonHandler = async () => {
    if (isLoggingOut) return;

    if (await confirmDialog("Выйти из аккаунта?", "Вы действительно хотите выйти из аккаунта?")) {
      setIsLoggingOut(true);
      const result = await logoutAction();
      if (isAppError(result)) {
        showErrorMessage("Ошибка", "Попробуйте позже");
        setIsLoggingOut(false);
      }

      ws.disconnect();
      setUser(null);
      router.push("/auth");
    }
  }

  if (loading) return <p>Загрузка</p>;
  return (
    <button onClick={buttonHandler} className={`grey rounded ${styles["button"]}`}>
      <img src="/ui/log-out.svg" alt="Выход" />
      Выйти
    </button>
  )
}