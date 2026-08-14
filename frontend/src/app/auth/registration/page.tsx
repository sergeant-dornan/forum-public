"use client";

import styles from "./registration.module.css";
import ToAuthButton from "../_ToAuthButton/ToAuthButton";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useUser } from "@/shared/contexts/UserContext";
import { registrationAction } from "./action";
import { PasswordInput } from "@/shared/components/PasswordInput/PasswordInput";
import { showError } from "@/shared/utils/Error/showError";
import { isAppError } from "@/shared/utils/Error/Error.guards";

export default function RegistrationPage() {
  // Состояния формы и полей формы
  const [userContext, formAction] = useActionState(registrationAction, null);
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

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
    <div className={`${styles["registration-div"]}`}>
      <ToAuthButton />
      <form action={formAction} className={`black rounded ${styles["registration-form"]}`}>
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
          name="password1"
          value={password1 ?? ""}
          onChange={(e) => setPassword1(e.target.value)}
          type="password"
          placeholder="Придумайте пароль"
          className="crimson rounded"
          autoComplete="new-password"
        />
        <PasswordInput
          name="password2"
          value={password2 ?? ""}
          onChange={(e) => setPassword2(e.target.value)}
          type="password"
          placeholder="Повторите пароль"
          className="crimson rounded"
          autoComplete="new-password"
        />
        <input
          name="phone"
          value={phone ?? ""}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          placeholder="Введите номер телефона"
          className="crimson rounded"
          autoComplete="tel"
        />
        <input
          name="email"
          value={email ?? ""}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Введите email"
          className="crimson rounded"
          autoComplete="email"
        />

        <button className="pink rounded" type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}