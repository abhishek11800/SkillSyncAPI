import { NextFunction, Request, Response } from "express";
import ApiResponse from "../../common/models/api-response.model";
import { ERROR } from "../../common/constants/error.constant";
import ApiCollectionResponse from "../../common/models/api-collection-response.model";
import { User } from "../../database/models/association";

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();
        res.json(ApiCollectionResponse.success(users));
    } catch (error) {
        res.status(500).json(ApiResponse.error("Error fetching users"));
    }
};

// Get a user by ID
export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(ApiResponse.success(user));
        } else {
            res.status(404).json(ApiResponse.error(ERROR.USER_NOT_FOUND));
        }
    } catch (error) {
        res.status(500).json(ApiResponse.error("Error fetching user"));
    }
};

// Update user details
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByPk(req.params.id);
        
        if (!user) {
            return res.status(404).json(ApiResponse.error(ERROR.USER_NOT_FOUND));
        }

        // Update user data
        await user.update({ name, email });
        res.json(ApiResponse.success(user, "User updated successfully"));
    } catch (error) {
        res.status(500).json(ApiResponse.error("Error updating user"));
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json(ApiResponse.error(ERROR.USER_NOT_FOUND));
        }

        await user.destroy();
        res.json(ApiResponse.success({}, "User deleted successfully"));
    } catch (error) {
        res.status(500).json(ApiResponse.error("Error deleting user"));
    }
};