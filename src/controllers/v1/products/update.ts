import { Product, type ProductWrite } from "@db/models/Product";
import { APIError, type TypedRequest } from "@utils";
import type { Response } from "express";

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
