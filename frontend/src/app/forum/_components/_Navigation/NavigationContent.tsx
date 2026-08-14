"use client";

import styles from "./navigation.module.css";
import { useEffect, useState } from "react";
import { useForum } from "@/shared/contexts/ForumContext";
import useTopicsFilter from "@/shared/hooks/useTopicsFilter/useTopicsFilter";
import Options from "./_Options/Options";
import Topics from "./_Topics/Topics";
import Categories from "./_Categories/Categories";
import { usePathname } from "next/navigation";
import type { CategoryListItem, TopicListItem } from "@forum/shared";
import type { CategoryData } from "./navigation.types";

interface NavigationContentProps {
  categories: CategoryListItem[];
  topics: TopicListItem[];
};

export default function NavigationContent({ categories, topics }: NavigationContentProps) {
  const [categoryIndex, setCategoryIndex] = useState(0);

  // Получаем и обновляем контекст навигации
  const { navigationHidden, setNavigationHidden } = useForum();
  const pathname = usePathname();

  // Скрываем навигацию, при переходе на другую страницу
  useEffect(() => {
    setNavigationHidden(true);
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

  // Сортируем темы
  const { openTopics, closedTopics } = useTopicsFilter(topics);

  return (
    <nav className={`black ${styles["navigation-div"]} ${navigationHidden ? "mobile-hidden" : ""}`}>
      <Categories
        prevCategoryButtonFunc={prevCategoryButtonFunc}
        nextCategoryButtonFunc={nextCategoryButtonFunc}
        categoryData={categoryData}
      />
      <Options />
      <Topics openTopics={openTopics} closedTopics={closedTopics} categoryIndex={categoryIndex} />
    </nav>
  )
}