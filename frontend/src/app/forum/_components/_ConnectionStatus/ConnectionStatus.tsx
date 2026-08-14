"use client";

import styles from "./connection-status.module.css";
import { useForum } from "@/shared/contexts/ForumContext";

export default function ConnectionStatus() {
  const { isConnected, navigationHidden } = useForum();

  if (!isConnected) {
    return (
      <div className={`grey rounded ${styles["connection-status"]} ${!navigationHidden ? "mobile-hidden" : ""}`}>
        <h2>Соединение...</h2>
      </div>
    );
  }
  return;
}