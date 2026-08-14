"use client";

import styles from "./topics-list.module.css";
import Link from "next/link";
import HideTopicButton from "./_TopicButtons/HideTopicButton";
import DeleteTopicButton from "./_TopicButtons/DeleteTopicButton";
import OpenTopicButton from "./_TopicButtons/OpenTopicButton";
import CloseTopicButton from "./_TopicButtons/CloseTopicButton";
import type { TopicListItem } from "@forum/shared";

export default function TopicsList({ topics }: { topics: TopicListItem[] }) {
  return (
    <section className={`${styles["topics"]}`}>
      {topics.map((topic) => {
        return (
          <div className={`rounded ${styles["topic"]}`} key={topic.topicId}>
            <article className={`crimson rounded ${styles["topic-head"]}`}>
              <Link href={`/forum/${topic.topicId}`}>{topic.title}</Link>
            </article>
            <div className={`${styles["topic-foot"]}`}>
              <OpenTopicButton topicId={topic.topicId} status={topic.status} />
              <CloseTopicButton topicId={topic.topicId} status={topic.status} />
              <HideTopicButton topicId={topic.topicId} status={topic.status} />
              <DeleteTopicButton topicId={topic.topicId} />
            </div>
          </div>
        )
      })}
    </section>
  )
}