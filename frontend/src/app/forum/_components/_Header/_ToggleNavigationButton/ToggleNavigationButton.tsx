"use client";

import type { MouseEvent } from "react";
import styles from "./toggle-navigation-button.module.css";
import { useForum } from "@/shared/contexts/ForumContext";

export default function ToggleNavigationButton() {
  const { setNavigationHidden, navigationHidden } = useForum()

  const showNavigationFunc = (event: MouseEvent<HTMLButtonElement>) => {
    setNavigationHidden(!navigationHidden);
  }

  return (
    <button className={`grey rounded computer-hidden ${styles["button"]}`} onClick={showNavigationFunc} >
      {navigationHidden ? "Показать навигацию" : "Скрыть навигацию"}
    </button>
  )
}