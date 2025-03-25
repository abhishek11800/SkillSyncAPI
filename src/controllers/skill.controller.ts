import ApiCollectionResponse from "../common/models/api-collection-response.model";
import { Request, Response } from "express";
import { Skill } from "../database/models/association";

export const listSkills = async (req: Request, res: Response) => {
    const skills = await Skill.findAll();
    res.json(ApiCollectionResponse.success(skills));
};
