import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGE } from "../common/constants/message.constant";
import { HTTP_CODE } from "../common/constants/http-code.constant";
import ApiResponse from "../common/models/api-response.model";
import { ROLE } from "../common/constants/role.constant";

function validateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const role = req.body.user.role;
        if (role !== ROLE.ADMIN) throw new Error();
        next();
    } catch (error) {
        res.status(HTTP_CODE.UNAUTHORIZED).send(ApiResponse.error(ERROR_MESSAGE.UNAUTHORIZED));
        return;
    }
}

export default validateAdmin;
