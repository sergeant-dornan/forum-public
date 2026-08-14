import express from "express";
import helmet from "helmet";
import cors from "cors";

import authRouter from "./endpoints/auth/auth.routes.js";
import categoriesRouter from "./endpoints/categories/categories.routes.js";
import topicsRouter from "./endpoints/topics/topics.routes.js";
import messagesRouter from "./endpoints/messages/messages.routes.js";
import userRouter from "./endpoints/user/user.routes.js";
import { errorHandler } from "@/shared/middlewares/errorHandler.js";

const httpApp = express();

if (!process.env.ALLOWED_ORIGINS) {
  console.error("Укажите ALLOWED_ORIGINS в .env в backend");
  process.exit(1);
}
console.log('ALLOWED_ORIGINS split:', process.env.ALLOWED_ORIGINS?.split(","));

// Глобальные middleware
httpApp.use(helmet());
httpApp.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(","),
  credentials: true
}));
httpApp.use(express.json());

// Подключаем маршруты
httpApp.use("/auth", authRouter);
httpApp.use("/categories", categoriesRouter);
httpApp.use("/topics", topicsRouter);
httpApp.use("/messages", messagesRouter);
httpApp.use("/user", userRouter);
httpApp.use(errorHandler);

export default httpApp