import type { Request, Response } from "express";
import getSimilarTopicsService from "./getSimilarTopics.service.js";
import { GetSimilarTopics } from "@forum/shared/http";
import { parseRequest } from "@/shared/utils/parsers/parseRequest/parseRequest.js";
import { topicListItemToResponse } from "@/shared/mappers/topic.mappers.js";

export default async function getSimilarTopicsController(
  req: Request<unknown, GetSimilarTopics.ResBody, unknown, unknown, {}>,
  res: Response<GetSimilarTopics.ResBody, {}>
): Promise<void> {
  const parsed = parseRequest(GetSimilarTopics, req);
  const { topicId } = parsed.params;

  const topics = await getSimilarTopicsService(topicId);
  const mapped = topicListItemToResponse(topics);

  res.status(200).json(mapped);
}