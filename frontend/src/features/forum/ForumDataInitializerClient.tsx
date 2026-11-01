"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setTopics } from "../topics/topicsSlice";
import useForumWebSocket from "./useForumWebSocket";
import { setCategories } from "../categories/categoriesSlice";
import { setUser } from "../user/userSlice";
import type { CategoryListItem, TopicListItem, UserState } from "@forum/shared/schemas";

interface ForumDataInitializerClientProps {
  children: ReactNode;
  user: UserState;
  categories: CategoryListItem[];
  topics: TopicListItem[];
};

export default function ForumDataInitializerClient({
  children, user, categories, topics
}: ForumDataInitializerClientProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(user))
    dispatch(setCategories(categories));
    dispatch(setTopics(topics));
    setIsInitialized(true);
  }, [dispatch, user, categories, topics]);

  useForumWebSocket(isInitialized);

  if (isInitialized) return children;
  return null;
}