"use client";

import styles from "./my-topics.module.css";
import { useForum } from "@/shared/contexts/ForumContext";
import { useUser } from "@/shared/contexts/UserContext";
import useTopicsFilter from "@/shared/hooks/useTopicsFilter/useTopicsFilter";
import TopicsList from "./_TopicsList/TopicsList";
import type { TopicListItem } from "@forum/shared";

export default function MyTopicsPageContent({ topics }: { topics: TopicListItem[] }) {
  // Получаем айди пользователя
  const { user } = useUser();
  const userId = user?.userId;

  const { navigationHidden } = useForum(); // Узнаем, показываeт ли навигацию
  const { openTopics, closedTopics, hiddenTopics, allTopics } = useTopicsFilter(topics);
  const userOpenTopics = openTopics.filter((topic) => topic.userId === userId);
  const userClosedTopics = closedTopics.filter((topic) => topic.userId === userId);
  const userHiddenTopics = hiddenTopics.filter((topic) => topic.userId === userId);
  const userAllTopics = allTopics.filter((topic) => topic.userId === userId);

  return (
    <div className={`${!navigationHidden ? "mobile-hidden" : ""}`}>
      <h1 className={`${styles["section-title"]}`}>Ваши темы: ({userAllTopics.length}/{30})</h1>

      {/* Открытые */}
      {userOpenTopics.length > 0 && <div>
        <h1 className={`${styles["section-title"]}`}>Открытые темы: ({userOpenTopics.length}/{5})</h1>
        <TopicsList topics={userOpenTopics} />
      </div>
      }

      {/* Закрытые */}
      {userClosedTopics.length > 0 && <div>
        <h1 className={`${styles["section-title"]}`}>Закрытые темы: ({userClosedTopics.length}/{5})</h1>
        <TopicsList topics={userClosedTopics} />
      </div>
      }

      {/* Скрытые */}
      {userHiddenTopics.length > 0 && <div>
        <h1 className={`${styles["section-title"]}`}>Скрытые темы:</h1>
        <TopicsList topics={userHiddenTopics} />
      </div>
      }
    </div>
  )
}