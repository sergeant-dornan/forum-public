"use client";

import styles from "./categories.module.css";
import Image from "next/image";
import Category from "./_Category/Category";
import type { CategoryData } from "../navigation.types";

interface CategoriesProps {
  prevCategoryButtonFunc: () => void;
  nextCategoryButtonFunc: () => void;
  categoryData: CategoryData;
};

export default function Categories({ prevCategoryButtonFunc, nextCategoryButtonFunc, categoryData }: CategoriesProps) {
  return (
    <div className={`${styles["categories-div"]}`}>
      <h2>Выберите категорию:</h2>

      <div className={`pink rounded ${styles["categories-switcher"]}`}>
        <button onClick={() => { prevCategoryButtonFunc() }} className={`crimson rounded ${styles["change-category"]}`}>
          <Image src="/ui/step-back.svg" alt="Step back" width={36} height={36} />
        </button>
        <Category categoryData={categoryData} />
        <button onClick={() => { nextCategoryButtonFunc() }} className={`crimson rounded ${styles["change-category"]}`}>
          <Image src="/ui/step-forward.svg" alt="Step forward" width={36} height={36} />
        </button>
      </div>
    </div>
  )
}