import { Router } from "express";
import registrationController from "./registration/registration.controller.js";
import loginController from "./login/login.controller.js";
import logoutController from "./logout/logout.controller.js";
import checkSessionController from "./checkSession/checkSession.controller.js";

const authRouter = Router();

authRouter.post("/registration", registrationController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController)
authRouter.get("/check-session", checkSessionController);

export default authRouter;