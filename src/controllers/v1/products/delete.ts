import type { Response } from "express";
import { Product, type ProductWrite } from "../../../db/models/Product.ts";
import { APIError, type TypedRequest } from "../../../utils.ts";

const deleteProduct = async (
	req: TypedRequest<never, { id: string }>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);

		if (!product) throw new APIError(404);

		await product.destroy();

		res.status(204).send();
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { deleteProduct };
