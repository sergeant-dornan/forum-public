"use client";

import { useState } from "react";
import styles from "./tech-info.module.css";

export default function TechInfo() {
  const [disabled, setIsDisabled] = useState(false);


  if (disabled) return null;
  return (
    <div className={`grey rounded ${styles["tech-info"]}`}>
      <p>
        После входа в аккаунт мы создадим технические файлы cookie,
        необходимые для работы сайта и сохранения сессии. Срок
        действия - 7 дней, после чего потребуется повторный вход.
        Cookie не используются для аналитики или рекламы
      </p>
      <button onClick={() => setIsDisabled(true)} className="pink rounded"><b>ОК</b></button>
    </div>
  )
}