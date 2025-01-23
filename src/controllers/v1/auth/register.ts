import { hash } from "argon2";
import type { Response } from "express";
import { User, type UserWrite } from "../../../db/models/User.ts";
import { APIError, type TypedRequest } from "../../../utils.ts";

const register = async (req: TypedRequest<UserWrite>, res: Response) => {
	try {
		const { password, ...rest } = req.body;

		await User.create({
			...rest,
			password: await hash(password),
			role: "customer",
		});

		res.status(201).send();
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { register };
