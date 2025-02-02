import type { Response } from "express";
import { Cart, CartItem, Command } from "#db/models";
import { Product } from "#db/models/Product";
import { APIError, type AuthenticatedRequest } from "#utils";

const command = async (
	req: AuthenticatedRequest<{
		address: string;
	}>,
	res: Response,
) => {
	try {
		const { address } = req.body;

		if (!address) throw new APIError(400, "Address is required");

		const cart = await Cart.findOne({
			where: {
				UserId: req.user,
			},
		});

		if (!cart) throw new APIError(404);

		const cartItems = await CartItem.findAll({
			where: {
				CartId: cart.toJSON().id,
			},
			include: [Product],
		});

		if (!cartItems.length) throw new APIError(404, "Cart is empty");

		const outOfStockProducts = cartItems.filter((cartItem) => {
			const product = cartItem.toJSON().Product;
			return product.count < cartItem.toJSON().quantity;
		});

		if (outOfStockProducts.length) {
			throw new APIError(400, "Some products are out of stock");
		}

		const command = Command.build({
			UserId: req.user,
			address,
		});

		let total = 0;

		for (const cartItem of cartItems) {
			const product = await Product.findByPk(cartItem.toJSON().ProductId);
			if (!product) throw new APIError(404);
			const quantity = cartItem.toJSON().quantity;
			const price = product.toJSON().price;
			total += price * quantity;
			await product.update({
				count: product.toJSON().count - quantity,
			});
		}

		command.total = total;
		await command.save();

		await cart.destroy();

		res.json(command);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { command };
