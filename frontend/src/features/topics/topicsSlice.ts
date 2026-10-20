import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TopicsRecord } from "./topicTypes";
import type { TopicListItem } from "@forum/shared/schemas";

const initialState: TopicsRecord = {};

export const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    setTopics: (_state, action: PayloadAction<TopicListItem[]>) => {
      return action.payload.reduce((dict: TopicsRecord, topic) => {
        dict[topic.topicId] = topic;
        return dict;
      }, {});
    },
    addTopic: (state, action: PayloadAction<TopicListItem>) => {
      const topic = action.payload;
      state[topic.topicId] = topic;
    },
    deleteTopic: (state, action: PayloadAction<TopicListItem["topicId"]>) => {
      const topicId = action.payload;
      delete state[topicId];
    },
    changeTopicStatus: (state, action: PayloadAction<Pick<TopicListItem, "topicId" | "status">>) => {
      const { topicId, status } = action.payload;
      if (state[topicId]) state[topicId].status = status;
    }
  }
});

export const { setTopics, addTopic, deleteTopic, changeTopicStatus } = topicsSlice.actions;
export const topicsReducer = topicsSlice.reducer;