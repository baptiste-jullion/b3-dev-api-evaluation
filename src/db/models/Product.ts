import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../index.ts";

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

export { Product };
