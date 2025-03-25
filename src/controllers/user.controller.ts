import { ERROR_MESSAGE, SUCCESS_MESSAGE } from './../common/constants/message.constant';
import { Request, Response } from "express";
import ApiResponse from "../common/models/api-response.model";
import User from "../database/models/user";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
      res.status(400).json(ApiResponse.error(ERROR_MESSAGE.ALREADY_EXIST("User")));
      return;
  }
  // Hash password before saving
  const newUser = await User.create({ name, email, password });
  res.status(201).json(ApiResponse.success(newUser, SUCCESS_MESSAGE.USER_REGISTERED));
};