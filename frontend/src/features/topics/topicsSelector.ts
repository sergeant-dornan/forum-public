import type { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";
import { filterTopics, isTopicMatches } from "./topicHelpers";
import type { TopicListItem } from "@forum/shared/schemas";

export const selectTopicsRecord = (state: RootState) => state.topics;

export const selectTopics = createSelector(
  [selectTopicsRecord],
  (topicsRecord) => {
    const topicsList = Object.values(topicsRecord);

    const { openTopics, closedTopics, hiddenTopics } = filterTopics(topicsList);

    return { topicsList, openTopics, closedTopics, hiddenTopics };
  }
);

export const selectUserTopics = createSelector(
  [selectTopicsRecord,
    (_state, userId: TopicListItem["userId"]) => userId
  ],
  (topicsRecord, userId) => {
    const topicsList = Object.values(topicsRecord);

    const userTopics = topicsList.filter((topic) => topic.userId === userId);

    const { openTopics, closedTopics, hiddenTopics } = filterTopics(userTopics);

    return { topicsList: userTopics, openTopics, closedTopics, hiddenTopics };
  }
);

export const selectSearchedTopics = createSelector(
  [selectTopicsRecord,
    (_state: RootState, query: string) => query,
    (_state: RootState, _query: string, categoryId?: TopicListItem["categoryId"]) => categoryId
  ],
  (topicsRecord, query, categoryId) => {
    const topicsList = Object.values(topicsRecord);

    let searchedTopics: TopicListItem[]
    if (categoryId) {
      searchedTopics = topicsList.filter((topic) =>
        isTopicMatches(topic, query)
        && topic.categoryId === categoryId);
    } else {
      searchedTopics = topicsList.filter((topic) => isTopicMatches(topic, query));
    }

    const { openTopics, closedTopics, hiddenTopics } = filterTopics(searchedTopics);

    return { topicsList: searchedTopics, openTopics, closedTopics, hiddenTopics };
  }
);