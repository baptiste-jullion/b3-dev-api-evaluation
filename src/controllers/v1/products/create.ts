import { Product, type ProductWrite } from "@db/models/Product";
import { APIError, type TypedRequest } from "@utils";
import type { Response } from "express";

const createProduct = async (
	req: TypedRequest<ProductWrite>,
	res: Response,
) => {
	try {
		const product = await Product.create(req.body);

		res.status(201).json(product);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { createProduct };
