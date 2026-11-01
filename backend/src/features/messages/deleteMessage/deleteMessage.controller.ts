import type { Request, Response } from 'express';
import deleteMessageService from './deleteMessage.service.js';
import { DeleteMessage } from '@forum/shared/http';
import type { AuthLocals } from '@/shared/middlewares/authMiddleware.js';
import { parseRequest } from '@/shared/utils/parsers/parseRequest/parseRequest.js';

export default async function deleteMessageController(
  req: Request<unknown, DeleteMessage.ResBody, unknown, unknown, AuthLocals>,
  res: Response<DeleteMessage.ResBody, AuthLocals>
): Promise<void> {
  const parsed = parseRequest(DeleteMessage, req);
  const { messageId } = parsed.params;
  const { userId } = res.locals;

  await deleteMessageService(messageId, userId);

  res.status(204).send();
}