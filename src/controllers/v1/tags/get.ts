import type { Response } from "express";
import { Tag } from "#db/models";
import { APIError, type TypedRequest } from "#utils";

const getTag = async (
	req: TypedRequest<never, { id: string }>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const tag = await Tag.findByPk(id);

		if (!tag) throw new APIError(404);

		res.json(tag);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { getTag };
