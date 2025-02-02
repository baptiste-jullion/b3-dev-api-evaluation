import type { Response } from "express";
import { Cart, CartItem } from "#db/models";
import { Product } from "#db/models/Product";
import { APIError, type AuthenticatedRequest } from "#utils";

const getCart = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const cart = await Cart.findOne({
			where: {
				UserId: req.user,
			},
			include: {
				model: CartItem,
				include: [Product],
			},
		});

		if (!cart) throw new APIError(404);

		res.json(cart);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { getCart };
