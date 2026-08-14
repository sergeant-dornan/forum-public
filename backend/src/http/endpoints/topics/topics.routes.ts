import { Router } from 'express';
import { authMiddleware } from '@/shared/middlewares/authMiddleware.js';
import getTopicsController from './getTopics/getTopics.controller.js';
import searchController from './searchTopics/searchTopics.controller.js';
import getTopicController from './getTopic/getTopic.controller.js';
import getTopicRolesController from './getTopicRoles/getTopicRoles.controller.js';
import getSimilarTopicsController from './getSimilarTopics/getSimilarTopics.controller.js';
import createTopicController from './createTopic/createTopic.controller.js';
import changeUserRoleController from './changeUserRole/changeUserRole.controller.js';
import deleteUserRoleController from './deleteUserRole/deleteUserRole.controller.js';
import deleteTopicController from './deleteTopic/deleteTopic.controller.js';
import changeTopicStatusController from './changeTopicStatus/changeTopicStatus.controller.js';

const topicsRouter = Router();

topicsRouter.get("/", getTopicsController);
topicsRouter.post("/", authMiddleware, createTopicController);
topicsRouter.get("/search", searchController);
topicsRouter.get("/:topicId", getTopicController);
topicsRouter.delete("/:topicId", authMiddleware, deleteTopicController);
topicsRouter.get("/:topicId/roles", getTopicRolesController);

topicsRouter.post("/:topicId/role", authMiddleware, changeUserRoleController);
topicsRouter.delete("/:topicId/users/:userId/role", authMiddleware, deleteUserRoleController);

topicsRouter.get("/:topicId/similar", getSimilarTopicsController);
topicsRouter.patch("/:topicId/status", authMiddleware, changeTopicStatusController);

export default topicsRouter;