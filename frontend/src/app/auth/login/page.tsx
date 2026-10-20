"use client";

import styles from "./login.module.css";
import ToAuthButton from "../_ToAuthButton/ToAuthButton";
import { useActionState } from "react";
import { loginAction } from "./action";
import LoginForm from "./LoginForm";
import { useAuthSubmit } from "../useAuthSubmit";

export default function LoginPage() {
  // Состояния формы и полей формы
  const [userState, formAction, isPending] = useActionState(loginAction, null);

  const { isSubmitting } = useAuthSubmit(userState, isPending);

  return (
    <div className={`${styles["login-div"]}`}>
      <ToAuthButton />
      <LoginForm action={formAction} isSubmitting={isSubmitting} />
    </div>
  );
}