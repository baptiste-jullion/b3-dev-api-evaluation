import { DataTypes } from "sequelize";
import { sequelizeInstance } from "#db/index";

const Command = sequelizeInstance.define("Command", {
	address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	total: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
});

export { Command };
