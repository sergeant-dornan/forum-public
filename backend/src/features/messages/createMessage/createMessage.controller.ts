import type { Request, Response } from 'express';
import createMessageService from './createMessage.service.js';
import { CreateMessage } from '@forum/shared/http';
import { parseRequest } from '@/shared/utils/parsers/parseRequest/parseRequest.js';
import type { AuthLocals } from '@/shared/middlewares/authMiddleware.js';
import { messageListItemToResponse } from '@/shared/mappers/message.mappers.js';

export default async function createMessageController(
  req: Request<unknown, CreateMessage.ReqBody, unknown, unknown, AuthLocals>,
  res: Response<CreateMessage.ResBody, AuthLocals>
): Promise<void> {
  const parsed = parseRequest(CreateMessage, req);
  const { message, topicId } = parsed.reqBody;
  const { userId } = res.locals;

  const createdMessage = await createMessageService(message, topicId, userId);
  const mapped = messageListItemToResponse(createdMessage)

  res.status(200).json(mapped);
}