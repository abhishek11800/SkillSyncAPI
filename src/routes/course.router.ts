import express from "express";
import asyncHandler from "express-async-handler";
import { listCourses } from "../controllers/course.controller";

const courseRouter = express.Router();
courseRouter.get("/", asyncHandler(listCourses));

export default courseRouter;