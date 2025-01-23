import type { Response } from "express";
import { Product, type ProductWrite } from "../../../db/models/Product.ts";
import { APIError, type TypedRequest } from "../../../utils.ts";

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
