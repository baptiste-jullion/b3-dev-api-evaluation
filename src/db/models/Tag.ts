import { DataTypes } from "sequelize";
import { z } from "zod";
import { sequelizeInstance } from "#db/index";
import type { SequelizeDefaultAttributes } from "#utils";

const Tag = sequelizeInstance.define("Tag", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const ZTagWrite = z.object({
	title: z.string(),
});

type TagWrite = z.infer<typeof ZTagWrite>;
interface TagRead extends TagWrite, SequelizeDefaultAttributes {}

export { Tag, ZTagWrite, type TagWrite, type TagRead };
