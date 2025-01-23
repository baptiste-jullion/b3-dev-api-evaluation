import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../index.ts";

const CartItem = sequelizeInstance.define("CartItem", {
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

export { CartItem };
