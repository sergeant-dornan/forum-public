"use client";

import { HighlightedText } from "@/shared/components/HighlightedText";
import styles from "./topics-list.module.css";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import type { CategoryListItem, TopicListItem } from "@forum/shared/schemas";

interface TopicListProps {
  topics: TopicListItem[];
  query: string;
}

export default function TopicsList({ topics, query }: TopicListProps) {
  const categories = useAppSelector((state) => state.categories);

  const categoriesById = new Map<CategoryListItem["categoryId"], CategoryListItem["title"]>();
  categories.forEach(category => {
    categoriesById.set(category.categoryId, category.title);
  });

  return (
    <section className={`${styles["topics"]}`}>
      {topics.map((topic) => {
        return (
          <div className={`rounded ${styles["topic"]}`} key={topic.topicId}>
            <article className="crimson rounded">
              <Link href={`/forum/${topic.topicId}`}>
                <HighlightedText text={topic.title} query={query} />
              </Link>
            </article>
            <p className="selectable-text">
              <b>Категория:</b> {categoriesById.get(topic.categoryId)}
              <br />
              <b>Описание:</b> <HighlightedText text={topic.description} query={query} />
            </p>
          </div>
        )
      })}
    </section>
  )
}