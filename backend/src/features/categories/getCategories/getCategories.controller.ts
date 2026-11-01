import type { Request, Response } from 'express';
import getCategoriesService from './getCategories.service.js';
import type { GetCategories } from '@forum/shared/http';

export default async function getCategoriesController(
  _req: Request<unknown, GetCategories.ResBody, unknown, unknown, {}>,
  res: Response<GetCategories.ResBody, {}>
): Promise<void> {
  const categories = await getCategoriesService();

  res.status(200).json(categories);
}