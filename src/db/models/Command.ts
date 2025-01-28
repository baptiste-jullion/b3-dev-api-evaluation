import { sequelizeInstance } from "@db/index";
import { DataTypes } from "sequelize";

const Command = sequelizeInstance.define("Command", {
	address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export { Command };
