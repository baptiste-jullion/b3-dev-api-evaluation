import { hash } from "argon2";
import type { Response } from "express";
import { User, type UserWrite } from "#db/models/User";
import { APIError, type TypedRequest } from "#utils";

const updateUser = async (
	req: TypedRequest<UserWrite, { id: string }>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const { password, ...rest } = req.body;
		const user = await User.findByPk(id);

		if (!user) throw new APIError(404);

		await user.update({
			...rest,
			password: password ? await hash(password) : undefined,
		});

		const { password: _, ...targetUser } = user.toJSON();

		res.status(201).json(targetUser);
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { updateUser };
