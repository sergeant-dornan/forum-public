"use client";

import { selectSearchedTopics } from "@/features/topics/topicsSelector";
import { useAppSelector } from "@/lib/hooks";
import type { CategoryId } from "@forum/shared/schemas";
import { useEffect, useState } from "react";

export default function useTopicSearch(
  query: string, selectedCategoryId: CategoryId | undefined
) {
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 700);

    return () => clearTimeout(timer);
  }, [query]); 

  // Используем debouncedQuery для поиска
  return useAppSelector(state =>
    selectSearchedTopics(state, debouncedQuery, selectedCategoryId)
  );
}