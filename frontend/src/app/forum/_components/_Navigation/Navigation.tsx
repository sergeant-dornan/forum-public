"use client";

import styles from "./navigation.module.css";
import { useEffect, useState } from "react";
import Options from "./_Options/Options";
import Topics from "./_Topics/Topics";
import Categories from "./_Categories/Categories";
import { usePathname } from "next/navigation";
import type { CategoryData } from "./navigation.types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { closeNav } from "@/features/ui/uiSlice";

export default function Navigation() {
  const categories = useAppSelector((state) => state.categories)
  const [categoryIndex, setCategoryIndex] = useState(0);

  // Получаем и обновляем контекст навигации
  const isNavOpen = useAppSelector((state) => state.ui.isNavOpen);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  // Скрываем навигацию, при переходе на другую страницу
  useEffect(() => {
    dispatch(closeNav());
  }, [pathname]);

  // Работа с переключением категорий
  const prevCategoryButtonFunc = () => { setCategoryIndex(index => index > 0 ? index - 1 : categories.length - 1) }
  const nextCategoryButtonFunc = () => { setCategoryIndex(index => index < categories.length - 1 ? index + 1 : 0) }

  // Объект данных выбраной категории
  const categoryData: CategoryData = {
    current: categories[categoryIndex],
    categoryIndex,
    categoriesCount: categories.length
  };

  return (
    <nav className={`black ${styles["navigation-div"]} ${!isNavOpen ? "mobile-hidden" : ""}`}>
      <Categories
        prevCategoryButtonFunc={prevCategoryButtonFunc}
        nextCategoryButtonFunc={nextCategoryButtonFunc}
        categoryData={categoryData}
      />
      <Options />
      <Topics categoryIndex={categoryIndex} />
    </nav>
  )
}