import type { Response } from "express";
import { User } from "#db/models";
import { APIError, type TypedRequest } from "#utils";

const listUsers = async (req: TypedRequest<never>, res: Response) => {
	try {
		const users = await User.findAll({ attributes: { exclude: ["password"] } });

		res.json(users);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { listUsers };
