import { User } from "@db/models";
import { APIError, type TypedRequest } from "@utils";
import type { Response } from "express";

const listUsers = async (req: TypedRequest<never>, res: Response) => {
	try {
		const users = await User.findAll({ attributes: { exclude: ["password"] } });

		res.json(users);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { listUsers };
