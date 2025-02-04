import type { Response } from "express";
import { Tag, type TagWrite } from "#db/models/Tag";
import { APIError, type TypedRequest } from "#utils";

const createTag = async (req: TypedRequest<TagWrite>, res: Response) => {
	try {
		const tag = await Tag.create(req.body);

		res.status(201).json(tag);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { createTag };
