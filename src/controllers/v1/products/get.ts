import type { Response } from "express";
import { Product } from "../../../db/models";
import { APIError, type TypedRequest } from "../../../utils.ts";

const getProduct = async (
	req: TypedRequest<never, { id: string }>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id, { include: "Tags" });

		if (!product) throw new APIError(404);

		res.json(product);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { getProduct };
