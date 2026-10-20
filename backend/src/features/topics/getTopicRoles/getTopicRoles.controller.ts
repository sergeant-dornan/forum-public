import type { Request, Response } from 'express';
import getTopicRolesService from './getTopicRoles.service.js';
import { GetTopicRoles } from '@forum/shared/http';
import { parseRequest } from '@/shared/utils/parsers/parseRequest/parseRequest.js';

export default async function getTopicRolesController(
  req: Request<unknown, GetTopicRoles.ResBody, unknown, unknown, {}>,
  res: Response<GetTopicRoles.ResBody, {}>
): Promise<void> {
  const parsed = parseRequest(GetTopicRoles, req);
  const { topicId } = parsed.params;

  const roles = await getTopicRolesService(topicId);

  res.status(200).json(roles);
};