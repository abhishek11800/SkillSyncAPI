import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGE } from "../common/constants/message.constant";
import { HTTP_CODE } from "../common/constants/http-code.constant";
import ApiResponse from "../common/models/api-response.model";
import { JwtPayload } from "../common/types/jwt-payload.type";

function validateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1] || "";
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
    req.body.user = decoded;
    next();
  }
  catch (error) {
    res.status(HTTP_CODE.UNAUTHORIZED).send(ApiResponse.error(ERROR_MESSAGE.UNAUTHORIZED));
    return;
  }
}

export default validateUser;
