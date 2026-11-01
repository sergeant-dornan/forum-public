import type { TopicDetails, TopicListItem } from "@/shared/types/domain/topic.domain.js";

export function topicListItemToResponse(input: TopicListItem[]) {
  return input.map((topic) => ({
    topicId: topic.topicId,
    userId: topic.userId,
    title: topic.title,
    createdAt: topic.createdAt.toISOString(),
    statusChangedAt: topic.statusChangedAt?.toISOString() ?? null,
    description: topic.description,
    status: topic.status,
    categoryId: topic.categoryId
  }));
}

export function topicDetailsToResponse(input: TopicDetails) {
  return {
    topicId: input.topicId,
    userId: input.userId,
    title: input.title,
    createdAt: input.createdAt.toISOString(),
    statusChangedAt: input.statusChangedAt?.toISOString() ?? null,
    description: input.description,
    status: input.status,
    categoryId: input.categoryId,
    categoryTitle: input.categoryTitle,
    username: input.username,
    src: input.src,
    alt: input.alt
  }
}