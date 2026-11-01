import { Router } from "express";
import getCategories from "./getCategories/getCategories.controller.js";

const categoriesRouter = Router();

categoriesRouter.get("/", getCategories);

export default categoriesRouter;