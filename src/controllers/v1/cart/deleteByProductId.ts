import type { Response } from "express";
import { Cart, CartItem } from "#db/models";
import { APIError, type AuthenticatedRequest } from "#utils";

const deleteCartItemByProductId = async (
	req: AuthenticatedRequest<
		never,
		{
			productId: string;
		}
	>,
	res: Response,
) => {
	try {
		const { productId } = req.params;

		if (!productId) throw new APIError(400, "Product ID is required");

		const cart = await Cart.findOne({
			where: {
				UserId: req.user,
			},
		});

		if (!cart) throw new APIError(404);

		const nbDestroyed = await CartItem.destroy({
			where: {
				CartId: cart.toJSON().id,
				ProductId: productId,
			},
		});

		if (!nbDestroyed) throw new APIError(404);

		res.json({ message: "Cart item deleted" }).status(204);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { deleteCartItemByProductId };
