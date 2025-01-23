import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../index.ts";

const Test = sequelizeInstance.define("Test", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export { Test };
