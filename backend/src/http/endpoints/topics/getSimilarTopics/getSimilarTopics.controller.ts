import type { HTTP, Topic } from "@forum/shared";
import { parseNumber } from "@/shared/utils/parseNumber.js";
import type { NextFunction, Request, Response } from "express";
import getSimilarTopicsService from "./getSimilarTopics.service.js";

export default async function getSimilarTopicsController(
  req: Request, res: Response<HTTP.ResponseBody.GetSimilarTopics>, next: NextFunction
): Promise<void> {
  try {
    const topicId: Topic["topicId"] = parseNumber(req.params.topicId);

    const topics = await getSimilarTopicsService(topicId);

    res.status(200).json(topics);
  }
  catch (error) {
    next(error);
  }
}