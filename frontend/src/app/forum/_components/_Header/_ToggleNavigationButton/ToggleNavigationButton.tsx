"use client";

import styles from "./toggle-navigation-button.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleNavOpen } from "@/features/ui/uiSlice";

export default function ToggleNavigationButton() {
  const isNavOpen = useAppSelector((state) => state.ui.isNavOpen);
  const dispatch = useAppDispatch();

  const showNavigationFunc = () => dispatch(toggleNavOpen());

  return (
    <button className={`grey rounded computer-hidden ${styles["button"]}`} onClick={showNavigationFunc} >
      {!isNavOpen ? "Показать навигацию" : "Скрыть навигацию"}
    </button>
  )
}