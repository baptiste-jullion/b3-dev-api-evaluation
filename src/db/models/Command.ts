import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../index.ts";

const Command = sequelizeInstance.define("Command", {
	address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export { Command };
