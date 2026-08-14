"use client";

import styles from "./search.module.css";
import { useMemo, useState } from "react";
import useTopicSearch from "./useTopicSearch";
import useTopicsFilter from "@/shared/hooks/useTopicsFilter/useTopicsFilter";
import TopicsList from "./_TopicsList/TopicsList";
import { useForum } from "@/shared/contexts/ForumContext";
import type { CategoryListItem } from "@forum/shared";
import { parseNumber } from "@/shared/utils/parseNumber";

export default function TopicSearchPageContent({ categories }: { categories: CategoryListItem[] }) {
  const { navigationHidden } = useForum();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [query, setQuery] = useState("");

  // Динамически ищем темы
  const topics = useTopicSearch(query, parseNumber(selectedCategoryId));
  const { allTopics, closedTopics, openTopics } = useTopicsFilter(topics);

  const isTopicsFound = useMemo(() => {
    return allTopics.length === 0 && query.trim();
  }, [allTopics]);

  return (
    <div className={`${styles["search-div"]} ${!navigationHidden ? "mobile-hidden" : ""}`}>
      <h1 className={`${styles["section-title"]}`}>Поиск темы</h1>
      <div className={`grey rounded ${styles["options"]}`}>
        <label>
          Выберите категорию для поиска
          <select
            name="categoryId"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="white rounded"
          >
            <option value="" className="white">Искать везде</option>
            {categories.map((category) => {
              return <option key={category.categoryId} value={category.categoryId} className="black">{category.title}</option>
            })}
          </select>
        </label>

        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="search"
          placeholder="Поиск темы..."
          className="white rounded"
        />
      </div>

      {/* Открытые */}
      {openTopics.length > 0 && <div>
        <h1 className={`${styles["section-title"]}`}>Открытые темы:</h1>
        <TopicsList topics={openTopics} categories={categories} query={query} />
      </div>}

      {/* Закрытые */}
      {closedTopics.length > 0 && <div>
        <h1 className={`${styles["section-title"]}`}>Закрытые темы:</h1>
        <TopicsList topics={closedTopics} categories={categories} query={query} />
      </div>}

      {/* Темы не найдены */}
      {isTopicsFound &&
      <h1 className={`${styles["section-title"]}`}>Темы не найдены</h1>}
    </div>
  )
}