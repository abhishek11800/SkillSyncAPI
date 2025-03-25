import express from "express";
import { login, refreshToken, requestResetPassword, resetPassword } from "../controllers/auth.controller";
import { signUp } from "../controllers/user.controller";
import asyncHandler from "express-async-handler";

const authRouter = express.Router();
authRouter.post("/signup", asyncHandler(signUp));
authRouter.post("/login", asyncHandler(login));
authRouter.post("/refresh", asyncHandler(refreshToken));
authRouter.post("/forgot-password", asyncHandler(requestResetPassword));
authRouter.post("/reset-password", asyncHandler(resetPassword));

export default authRouter;