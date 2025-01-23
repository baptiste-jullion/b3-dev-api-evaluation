import { DataTypes } from "sequelize";
import { z } from "zod";
import type { SequelizeDefaultAttributes } from "../../utils.ts";
import { sequelizeInstance } from "../index.ts";

const User = sequelizeInstance.define("User", {
	role: {
		type: DataTypes.ENUM("customer", "admin"),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const ZUserWrite = z.object({
	role: z.enum(["customer", "admin"]),
	email: z.string().email(),
	password: z.string(),
});

type UserWrite = z.infer<typeof ZUserWrite>;
interface UserRead
	extends Omit<UserWrite, "password">,
		SequelizeDefaultAttributes {}

const ZUserWriteLogin = z.object({
	email: z.string().email(),
	password: z.string(),
});
type UserWriteLogin = z.infer<typeof ZUserWriteLogin>;

export {
	User,
	ZUserWrite,
	type UserWrite,
	type UserRead,
	type UserWriteLogin,
	ZUserWriteLogin,
};
