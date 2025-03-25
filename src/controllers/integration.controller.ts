import { Request, Response } from "express";
import { Integration } from "../database/models/association";
import ApiCollectionResponse from "../common/models/api-collection-response.model";

export const listIntegrations = async (req: Request, res: Response) => {
    const integrations = await Integration.findAll();
    res.json(ApiCollectionResponse.success(integrations));
};
