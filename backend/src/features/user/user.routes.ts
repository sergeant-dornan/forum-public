import { Router } from 'express';
import { authMiddleware } from '@/shared/middlewares/authMiddleware.js';
import getUserRolesController from './getUserRoles/getUserRoles.controller.js';
import getUserTopicsController from './getUserTopics/getUserTopics.controller.js';
import getMeController from './getMe/getMe.controller.js';

const userRouter = Router();

userRouter.get("/me", authMiddleware, getMeController);
userRouter.get("/roles", authMiddleware, getUserRolesController);
userRouter.get("/topics", authMiddleware, getUserTopicsController);

export default userRouter;