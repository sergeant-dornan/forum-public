"use client";

import { useAppSelector } from "@/lib/hooks";
import styles from "./connection-status.module.css";
import { useApp } from "@/contexts/AppContext";

export default function ConnectionStatus() {
  const { isConnected } = useApp();
  const isNavOpen = useAppSelector((state) => state.ui.isNavOpen);

  if (!isConnected) {
    return (
      <div className={`grey rounded ${styles["connection-status"]} ${!isNavOpen ? "mobile-hidden" : ""}`}>
        <h2>Соединение...</h2>
      </div>
    );
  }
  return;
}