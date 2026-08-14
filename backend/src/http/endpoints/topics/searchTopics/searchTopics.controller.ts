import type { NextFunction, Request, Response } from "express";
import searchTopicsService from "./searchTopics.service.js";
import type { HTTP } from "@forum/shared";

export default async function searchTopicsController(
  req: Request, res: Response<HTTP.ResponseBody.SearchTopic>, next: NextFunction
): Promise<void> {
  try {
    const q = req.query.q;
    if (!q) {
      res.status(200).json([]);
      return;
    };
    if (typeof q !== 'string') throw new Error("req.query.q - не строка");

    const categoryId = Number(req.query["category-id"]);
    if (isNaN(categoryId)) {
      const topics = await searchTopicsService(q);
      res.status(200).json(topics);
    } else {
      const topics = await searchTopicsService(q, categoryId);
      res.status(200).json(topics);
    }
  }
  catch (error) {
    next(error);
  }
}