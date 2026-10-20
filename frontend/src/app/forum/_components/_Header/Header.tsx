"use client";

import LogoutButton from "./_LogoutButton/LogoutButton";
import ToggleNavigationButton from "./_ToggleNavigationButton/ToggleNavigationButton";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={`black ${styles["header-div"]}`}>
      <div className={`${styles["left"]}`}>
        <ToggleNavigationButton />
        <img src="/favicon.ico" alt="F" className="mobile-hidden" />
        <h2 className="mobile-hidden">Danko Forum</h2>
      </div>

      <div className={`${styles["right"]}`}>
        <LogoutButton />
      </div>
    </div>
  )
} 