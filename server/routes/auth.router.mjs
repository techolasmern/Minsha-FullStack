import { Router } from "express";
import authController from "../controllers/auth.controller.mjs";
import { authMiddleware } from "../middlewares/auth.middleware.mjs";

const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);

authRouter.get("/check", authMiddleware, authController.checkAuth);

export default authRouter;
