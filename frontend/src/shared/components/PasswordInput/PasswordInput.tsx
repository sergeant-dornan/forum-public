"use client";

import styles from "./passwordInput.module.css";
import { useState, type ComponentProps } from "react";

type PasswordInputProps = ComponentProps<"input"> & {
  className?: string;
};

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className={`${styles["container"]} crimson rounded`}>
      <input
        {...props}
        type={show ? "text" : "password"}
        className="crimson rounded"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="grey rounded"
      >
        {show ?
          <img src="/ui/eye-open.svg" alt="Показать" /> :
          <img src="/ui/eye-closed.svg" alt="Скрыть" />}
      </button>
    </div>
  );
}