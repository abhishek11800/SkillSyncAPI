import express from "express";
import AppConfig from "./config";

const app = express();
const config = new AppConfig();

// Middleware
config.useMiddleware(app);
config.useRoutes(app);
config.useRecurringJobs();

// Error handling, must be the last middleware
config.useErrorHandler(app);

export default app;