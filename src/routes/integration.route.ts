import express from "express";
import asyncHandler from "express-async-handler";
import { listIntegrations } from "../controllers/integration.controller";

const integrationRouter = express.Router();
integrationRouter.get("/", asyncHandler(listIntegrations));

export default integrationRouter;