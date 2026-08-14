import { Router } from 'express';
import deleteMessageController from './deleteMessage/deleteMessage.controller.js';
import createMessageController from './createMessage/createMessage.controller.js';
import getMessagesController from './getMessages/getMessages.controller.js';
import { authMiddleware } from '@/shared/middlewares/authMiddleware.js';
import { checkBanMiddleware } from '@/shared/middlewares/checkBanMiddleware.js';

const messagesRouter = Router();

messagesRouter.get("/:topicId", getMessagesController);
messagesRouter.post("/", authMiddleware, checkBanMiddleware, createMessageController);
messagesRouter.delete("/:messageId", authMiddleware, deleteMessageController);

export default messagesRouter;