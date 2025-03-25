import { ERROR } from "../common/constants/error.constant";
import {Express, NextFunction, Request, Response } from "express";
import ApiResponse from "../common/models/api-response.model";

export default function useErrorHandler(app: Express) {
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        res.status(500).json(ApiResponse.error(ERROR.INTERNAL_SERVER_ERROR));
    });
}