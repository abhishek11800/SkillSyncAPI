import express from "express";
import asyncHandler from "express-async-handler";
import { listSkills } from "../controllers/skill.controller";

const skillRouter = express.Router();
skillRouter.get("/", asyncHandler(listSkills));

export default skillRouter;