import type { Response } from "express";
import type { Model } from "sequelize";
import { Cart, CartItem } from "#db/models";
import { Product, type ProductRead } from "#db/models/Product";
import { APIError, type AuthenticatedRequest } from "#utils";

const updateCart = async (
	req: AuthenticatedRequest<{
		productId: ProductRead["id"];
		quantity: number;
	}>,
	res: Response,
) => {
	try {
		const { productId, quantity } = req.body;
		if (!quantity) throw new APIError(400, "Quantity is required");

		const product = await Product.findByPk(productId);

		if (!product) throw new APIError(404);

		const cart = await Cart.findOrCreate({
			where: {
				UserId: req.user,
			},
		});

		const existingCartItem = await CartItem.findOne({
			where: {
				CartId: cart[0].toJSON().id,
				ProductId: productId,
			},
		});

		let cartItem: Model | null;

		if (existingCartItem) {
			cartItem = await existingCartItem.update({
				quantity: quantity,
			});
		} else {
			cartItem = await CartItem.create({
				CartId: cart[0].toJSON().id,
				ProductId: productId,
				quantity: quantity,
			});
		}

		res.json(cartItem);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { updateCart };
