"use client";

import { confirmDialog, showErrorMessage } from "@/shared/utils/swalUtils";
import styles from "./logout-button.module.css";
import { useRouter } from "next/navigation";
import { logoutAction } from "./action";
import { useState } from "react";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import { useAppDispatch } from "@/lib/hooks";
import { clearUser } from "@/features/user/userSlice";

export default function LogoutButton() {
  const dispatch = useAppDispatch();

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

      dispatch(clearUser());
      router.push("/auth");
    }
  }

  return (
    <button onClick={buttonHandler} className={`grey rounded ${styles["button"]}`}>
      <img src="/ui/log-out.svg" alt="Выход" />
      Выйти
    </button>
  )
}