import useMiddleware from "./config/middleware.config";
import { Express } from "express";
import loadRecurringJobs from "./config/recurring-jobs.config";
import useRoutes from "./route";
import useErrorHandler from "./config/error.config";

class AppConfig {
    useMiddleware(app: Express) {
        useMiddleware(app);
    }

    useRoutes(app: Express) {
        useRoutes(app);
    }

    useErrorHandler(app: Express) {
        useErrorHandler(app);
    }

    useRecurringJobs() {
        loadRecurringJobs();
    }
}

export default AppConfig;
