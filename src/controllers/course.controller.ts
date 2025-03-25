import ApiCollectionResponse from "../common/models/api-collection-response.model";
import { Request, Response } from "express";
import { Course, Skill } from "../database/models/association";

export const listCourses = async (req: Request, res: Response) => {
    const courses = await Course.findAll({
        include: [
            {
                model: Skill,
                as: "skills",
                through: { attributes: [] },
            },
        ],
    });
    res.json(ApiCollectionResponse.success(courses));
};
