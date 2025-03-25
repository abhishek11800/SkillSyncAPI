import express from "express";
import asyncHandler from "express-async-handler";
import { getAllUsers, getUser } from "../controllers/admin/user.controller";

const userRouter = express.Router();
userRouter.get("/", asyncHandler(getAllUsers));
userRouter.get("/:id", asyncHandler(getUser));

export default userRouter;