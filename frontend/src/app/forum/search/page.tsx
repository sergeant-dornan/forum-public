"use client";

import styles from "./search.module.css";
import { useMemo, useState } from "react";
import useTopicSearch from "./useTopicSearch";
import TopicsList from "./_TopicsList/TopicsList";
import { useAppSelector } from "@/lib/hooks";

export default function SearchPage() {
  const categories = useAppSelector((state) => state.categories);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [query, setQuery] = useState("");

  // Динамически ищем темы
  const { topicsList, openTopics, closedTopics } = useTopicSearch(query, selectedCategoryId);

  const isTopicsFound = useMemo(() => {
    return topicsList.length === 0 && query.trim();
  }, [topicsList]);

  return (
    <div className={`${styles["search-div"]}`}>
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
        <TopicsList topics={openTopics} query={query} />
      </div>}

      {/* Закрытые */}
      {closedTopics.length > 0 && <div>
        <h1 className={`${styles["section-title"]}`}>Закрытые темы:</h1>
        <TopicsList topics={closedTopics} query={query} />
      </div>}

      {/* Темы не найдены */}
      {isTopicsFound &&
        <h1 className={`${styles["section-title"]}`}>Темы не найдены</h1>}
    </div>
  )
}