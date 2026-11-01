import type { Request, Response } from 'express';
import getMessagesService from './getMessages.service.js';
import { GetMessages } from '@forum/shared/http';
import { parseRequest } from '@/shared/utils/parsers/parseRequest/parseRequest.js';
import { parseNumber } from '@/shared/utils/parseNumber.js';
import { messageListItemArrayToResponse } from '@/shared/mappers/message.mappers.js';

export default async function getMessagesController(
  req: Request<unknown, GetMessages.ResBody, unknown, unknown, {}>,
  res: Response<GetMessages.ResBody, {}>
): Promise<void> {
  const parsed = parseRequest(GetMessages, req);
  const { topicId } = parsed.params;
  const after = parsed.reqQuery.after ? parseNumber(parsed.reqQuery.after) : undefined;

  const messages = await getMessagesService(topicId, after);
  const mapped = messageListItemArrayToResponse(messages);

  res.status(200).json(mapped);
}