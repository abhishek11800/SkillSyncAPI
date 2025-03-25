import { NOT } from "sequelize/types/deferrable"

export const SUCCESS_MESSAGE = {
    LOGIN_SUCCESSFUL: "Login Successful",
    PASSWORD_RESET_SUCCESSFUL: "Password reset successful",
    PASSWORD_RESET_LINK_SENT: "Password reset link sent to your email, if it exists",
    USER_REGISTERED: "User registered successfully",
    USER_UPDATED: "User updated successfully",
    USER_DELETED: "User deleted successfully",
    GENERIC_SUCCESS: "Success",
}

export const ERROR_MESSAGE = {
    UNAUTHORIZED: "Unauthorized",
    INVALID_ORIGIN: "Invalid Origin",
    TOO_MANY_REQUESTS: "Too many requests, please try again later.",
    INVALID_EXPIRED_TOKEN: "Token has expired/invalid",
    NOT_FOUND: (model: string) => `${model} not found`,
    GENERIC_ERROR: "Something went wrong. Please try again later.",
    ALREADY_EXIST: (model: string) => `${model} already exists.`, 
}