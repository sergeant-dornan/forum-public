import type { Request, Response } from "express";
import searchTopicsService from "./searchTopics.service.js";
import { SearchTopics } from "@forum/shared/http";
import { parseRequest } from "@/shared/utils/parsers/parseRequest/parseRequest.js";
import { topicListItemToResponse } from "@/shared/mappers/topic.mappers.js";

export default async function searchTopicsController(
  req: Request<unknown, SearchTopics.ResBody, unknown, unknown, {}>,
  res: Response<SearchTopics.ResBody, {}>
): Promise<void> {
  const parsed = parseRequest(SearchTopics, req);
  const { q, categoryId } = parsed.reqQuery;
  if (q === undefined) {
    res.status(200).json([]);
    return;
  };

  if (categoryId === undefined) {
    const topics = await searchTopicsService(q);
    const mapped = topicListItemToResponse(topics);
    res.status(200).json(mapped);
  } else {
    const topics = await searchTopicsService(q, categoryId);
    const mapped = topicListItemToResponse(topics);
    res.status(200).json(mapped);
  }
}