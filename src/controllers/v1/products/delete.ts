import type { Response } from "express";
import { Product } from "#db/models/Product";
import { APIError, type TypedRequest } from "#utils";

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
