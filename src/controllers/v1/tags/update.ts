import type { Response } from "express";
import { Tag, type TagWrite } from "../../../db/models/Tag.ts";
import { APIError, type TypedRequest } from "../../../utils.ts";

const updateTag = async (
	req: TypedRequest<TagWrite, { id: string }>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const tag = await Tag.findByPk(id);

		if (!tag) throw new APIError(404);

		await tag.update(req.body);

		res.status(201).json(tag);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { updateTag };
