"use client";

import styles from "./registration.module.css";
import ToAuthButton from "../_ToAuthButton/ToAuthButton";
import { useActionState } from "react";
import { registrationAction } from "./action";
import RegistrationForm from "./RegistrationForm";
import { useAuthSubmit } from "../useAuthSubmit";

export default function RegistrationPage() {
  // Состояния формы и полей формы
  const [userState, formAction, isPending] = useActionState(registrationAction, null);

  const { isSubmitting } = useAuthSubmit(userState, isPending);

  return (
    <div className={`${styles["registration-div"]}`}>
      <ToAuthButton />
      <RegistrationForm action={formAction} isSubmitting={isSubmitting} />
    </div>
  );
}