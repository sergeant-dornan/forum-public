"use client";

import http from "@/shared/api/http/HttpClient";
import { useForum } from "@/shared/contexts/ForumContext";
import { isAppError } from "@/shared/utils/Error/Error.guards";
import { showError } from "@/shared/utils/Error/showError";
import { toAppError } from "@/shared/utils/Error/toAppError";
import type { Category, TopicListItem } from "@forum/shared";
import { useEffect, useState } from "react";

export default function useTopicSearch(
  query: string, selectedCategoryId: Category["categoryId"] | undefined
): TopicListItem[] {
  const { isConnected } = useForum();

  const [topics, setTopics] = useState<TopicListItem[]>([]);

  // Динамически ищем темы
  useEffect(() => {
    if (!isConnected || query.trim() === "") {
      setTopics([]);
      return;
    }

    // Функция поиска
    const performSearch = async () => {
      try {
        const topicHttpClient = http.client.getTopicClient();

        console.log(selectedCategoryId)

        if (selectedCategoryId) {
          const result = await topicHttpClient.searchTopic(query, selectedCategoryId); // Ищем в категории
          if (isAppError(result)) throw result;
          setTopics(result.data);
          return;
        }
        const result = await topicHttpClient.searchTopic(query); // Ищем везде
        if (isAppError(result)) throw result;
        setTopics(result.data);
      }
      catch (error) {
        showError(toAppError(error));
        setTopics([]);
      }
    };

    // Устанавливаем новый таймер
    const timer = setTimeout(performSearch, 1000);

    return () => clearTimeout(timer);
  }, [query, selectedCategoryId]);

  return topics;
}