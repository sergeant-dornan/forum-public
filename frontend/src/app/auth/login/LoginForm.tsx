"use client";

import styles from "./login.module.css";
import { PasswordInput } from "@/shared/components/PasswordInput/PasswordInput";
import { useState } from "react";
import type { AuthFormProps } from "../auth.types";

export default function LoginForm({ action, isSubmitting }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form action={action} className={`black rounded ${styles["login-form"]}`}>
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

      <button className="pink rounded" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Подождите..." : "Войти"}
      </button>
    </form>
  )
}