import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../index.ts";

const Tag = sequelizeInstance.define("Tag", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export { Tag };
