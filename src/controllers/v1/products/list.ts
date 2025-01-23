import type { Response } from "express";
import { Product, type ProductWrite } from "../../../db/models/Product.ts";
import { APIError, type TypedRequest } from "../../../utils.ts";

const listProducts = async (req: TypedRequest<never>, res: Response) => {
	try {
		const products = await Product.findAll({ include: "Tags" });

		res.json(products);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { listProducts };
