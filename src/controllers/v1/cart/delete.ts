import type { Response } from "express";
import { Cart, CartItem } from "#db/models";
import { APIError, type AuthenticatedRequest } from "#utils";

const deleteCart = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const cart = await Cart.findOne({
			where: {
				UserId: req.user,
			},
		});

		if (!cart) throw new APIError(404);

		await CartItem.destroy({
			where: {
				CartId: cart.toJSON().id,
			},
		});

		await cart.destroy();

		res.json({ message: "Cart deleted" }).status(204);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { deleteCart };
