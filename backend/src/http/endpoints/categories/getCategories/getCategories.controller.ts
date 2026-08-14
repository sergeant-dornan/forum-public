import type { NextFunction, Request, Response } from 'express';
import getCategoriesService from './getCategories.service.js';
import type { HTTP } from '@forum/shared';

// Получаем все категории
export default async function getCategoriesController(
  req: Request, res: Response<HTTP.ResponseBody.GetCategories>, next: NextFunction
): Promise<void> {
  try {
    const categories = await getCategoriesService();

    res.status(200).json(categories);
  }
  catch (error) {
    next(error);
  }
}