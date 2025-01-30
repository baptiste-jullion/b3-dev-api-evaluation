import { DataTypes } from "sequelize";
import { z } from "zod";
import { sequelizeInstance } from "#db/index";
import type { SequelizeDefaultAttributes } from "#utils";

const Product = sequelizeInstance.define("Product", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	count: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

const ZProductWrite = z.object({
	title: z.string(),
	price: z.number(),
	description: z.string(),
	count: z.number().int(),
});

type ProductWrite = z.infer<typeof ZProductWrite>;
interface ProductRead extends ProductWrite, SequelizeDefaultAttributes {}

export { Product, ZProductWrite, type ProductWrite, type ProductRead };
