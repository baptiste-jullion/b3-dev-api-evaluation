import { sequelizeInstance } from "@db/index";
import type { SequelizeDefaultAttributes } from "@utils";
import { DataTypes } from "sequelize";
import { z } from "zod";

const CartItem = sequelizeInstance.define("CartItem", {
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

const ZCartItem = z.object({
	quantity: z.number().int().positive(),
	product_id: z.number().int().positive(),
});

type CartItemWrite = z.infer<typeof ZCartItem>;

export { CartItem, ZCartItem, type CartItemWrite };
