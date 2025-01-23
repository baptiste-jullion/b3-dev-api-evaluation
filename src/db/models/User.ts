import { DataTypes } from "sequelize";
import { sequelizeInstance } from "../index.ts";

const User = sequelizeInstance.define("User", {
	role: {
		type: DataTypes.ENUM("visitor", "customer", "admin"),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export { User };
