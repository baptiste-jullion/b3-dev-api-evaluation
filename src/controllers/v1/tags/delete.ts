import { Tag } from "@db/models";
import { APIError, type TypedRequest } from "@utils";
import type { Response } from "express";

const deleteTag = async (
	req: TypedRequest<never, { id: string }>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const tag = await Tag.findByPk(id);

		if (!tag) throw new APIError(404);

		await tag.destroy();

		res.status(204).send();
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { deleteTag };
