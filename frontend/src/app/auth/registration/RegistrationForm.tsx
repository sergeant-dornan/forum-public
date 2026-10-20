"use client";

import { useState } from "react";
import styles from "./registration.module.css";
import { PasswordInput } from "@/shared/components/PasswordInput/PasswordInput";
import type { AuthFormProps } from "../auth.types";

export default function RegistrationForm({ action, isSubmitting }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form action={action} className={`black rounded ${styles["registration-form"]}`}>
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

      <button className="pink rounded" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Подождите..." : "Зарегистрироваться"}
      </button>
    </form>
  )
}