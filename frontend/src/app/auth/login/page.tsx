"use client";

import styles from "./login.module.css";
import ToAuthButton from "../_ToAuthButton/ToAuthButton";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useUser } from "@/shared/contexts/UserContext";
import { loginAction } from "./action";
import { PasswordInput } from "@/shared/components/PasswordInput/PasswordInput";
import { showError } from "@/shared/utils/Error/showError";
import { isAppError } from "@/shared/utils/Error/Error.guards";

export default function LoginPage() {
  // Состояния формы и полей формы
  const [userContext, formAction] = useActionState(loginAction, null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { setUser } = useUser(); // Получаем setUser из контекста

  // Отслеживание состояния формы
  useEffect(() => {
    if (!userContext) return;
    if (isAppError(userContext)) {
      showError(userContext);
      return;
    }

    setUser(userContext);
    router.push('/forum');
  }, [userContext, router]);

  return (
    <div className={`${styles["login-div"]}`}>
      <ToAuthButton />
      <form action={formAction} className={`black rounded ${styles["login-form"]}`}>

        <input
          name="username"
          value={username ?? ""}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Введите имя"
          className="crimson rounded"
          autoComplete="username"
        />
        <PasswordInput
          name="password"
          value={password ?? ""}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Пароль"
          className="crimson rounded"
          autoComplete="current-password"
        />

        <button className="pink rounded" type="submit">Войти</button>
      </form>
    </div>
  );
}