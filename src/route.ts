import { Express, Request, Response } from "express";
import ApiResponse from "./common/models/api-response.model";
import { ERROR } from "./common/constants/error.constant";
import apiRouter from "./routes/api.router";
import authRouter from "./routes/auth.router";
import validateUser from "./guards/user.guard";

const ping = (req: Request, res: Response) => {
    res.json(ApiResponse.success("pong"));
};

export default function useRoutes(app: Express) {
    app.use("/ping", ping);
    app.use('/api/auth', authRouter);
    app.use("/api", validateUser, apiRouter);

    // Handle unmatched routes
    app.all("*", (req, res) => {
        res.status(404).json(ApiResponse.error(ERROR.INVALID_ROUTE));
    });
}
