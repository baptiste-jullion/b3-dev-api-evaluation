import type { Response } from "express";
import { Product, type ProductWrite } from "../../../db/models/Product.ts";
import { APIError, type TypedRequest } from "../../../utils.ts";

const updateProduct = async (
	req: TypedRequest<ProductWrite, { id: string }>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);

		if (!product) throw new APIError(404);

		await product.update(req.body);

		res.status(201).json(product);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { updateProduct };
