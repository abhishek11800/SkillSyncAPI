import { Request, Response } from "express";
import ApiResponse from "../common/models/api-response.model";
import jwt from "jsonwebtoken";
import { HTTP_CODE } from "../common/constants/http-code.constant";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../common/constants/message.constant";
import bcrypt from "bcryptjs"; // Use bcryptjs instead of bcrypt
import resetPasswordMailWorker from "../workers/reset-password-mail.worker";
import { generateRandomToken } from "../utils/token.util";
import Token from "../database/models/token";
import { Op } from "sequelize";
import { User } from "../database/models/association";
import { sequelize } from "../database/models";
import { JwtPayload } from "../common/types/jwt-payload.type";
import { ROLE } from "../common/constants/role.constant";

// Login and Generate Access & Refresh Tokens
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(HTTP_CODE.UNAUTHORIZED).json(ApiResponse.error(ERROR_MESSAGE.GENERIC_ERROR));
        return;
    }

    // Generate JWT Tokens
    const admins = process.env.ADMIN_EMAILS!.split(",");
    const role = admins.includes(user.email) ? ROLE.ADMIN : ROLE.USER;
    const { name } = user;
    const payload: JwtPayload = { name, email, role };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "24h" });

    res.status(HTTP_CODE.OK).json(ApiResponse.success({ token, refreshToken }, SUCCESS_MESSAGE.LOGIN_SUCCESSFUL));
};

// Refresh Access Token using Refresh Token (Fixed Logic)
export const refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(HTTP_CODE.BAD_REQUEST).json(ApiResponse.error(ERROR_MESSAGE.GENERIC_ERROR));
        return;
    }

    const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    const user = await User.findByPk(decoded.id);
    if (!user) {
        res.status(HTTP_CODE.UNAUTHORIZED).json(ApiResponse.error(ERROR_MESSAGE.NOT_FOUND("User")));
        return;
    }

    // Generate new access token
    const newAccessToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1h" });
    res.status(HTTP_CODE.OK).json(ApiResponse.success({ token: newAccessToken }, SUCCESS_MESSAGE.GENERIC_SUCCESS));
};

// Forgot Password (Send Reset Link)
export const requestResetPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        res.status(HTTP_CODE.NOT_FOUND).json(ApiResponse.error(ERROR_MESSAGE.NOT_FOUND("User")));
        return;
    }

    // Generate a password reset token (valid for 15 minutes)
    const resetToken = generateRandomToken();
    await Token.create({
        userId: user.id,
        token: resetToken,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    // Send email with reset link
    await resetPasswordMailWorker.performNow({ user, resetToken });
    res.json(ApiResponse.success(null, SUCCESS_MESSAGE.PASSWORD_RESET_LINK_SENT));
};

// Reset Password (Using Token)
export const resetPassword = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    const dbToken = await Token.findOne({where: { token, expiresAt: { [Op.gt]: new Date() } }});
    if (!dbToken) {
        res.status(HTTP_CODE.NOT_FOUND).json(ApiResponse.error(ERROR_MESSAGE.INVALID_EXPIRED_TOKEN));
        return;
    }

    const user = await User.findByPk(dbToken.userId);
    if (!user) {
        res.status(HTTP_CODE.NOT_FOUND).json(ApiResponse.error(ERROR_MESSAGE.GENERIC_ERROR));
        return;
    }

    // Hash new password and update in database
    await sequelize.transaction(async (t) => {
        user.password = newPassword;
        await dbToken.destroy({ transaction: t });
        await user.save({ transaction: t });
    });

    res.json(ApiResponse.success(null, SUCCESS_MESSAGE.PASSWORD_RESET_SUCCESSFUL));
};
