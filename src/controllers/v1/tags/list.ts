import { Tag } from "@db/models";
import { APIError, type TypedRequest } from "@utils";
import type { Response } from "express";

const listTags = async (req: TypedRequest<never>, res: Response) => {
	try {
		const tags = await Tag.findAll();

		res.json(tags);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { listTags };
