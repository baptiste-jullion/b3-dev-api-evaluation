import { hash } from "argon2";
import type { Response } from "express";
import { User, type UserWrite } from "../../../db/models/User.ts";
import { APIError, type TypedRequest } from "../../../utils.ts";

const createUser = async (req: TypedRequest<UserWrite>, res: Response) => {
	try {
		const { password, ...rest } = req.body;

		const createdUser = await User.create({
			...rest,
			password: await hash(password),
		});

		const { password: _, ...user } = createdUser.toJSON();

		res.status(201).json(user);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { createUser };
