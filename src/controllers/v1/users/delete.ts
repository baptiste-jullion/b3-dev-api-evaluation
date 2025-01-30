import type { Response } from "express";
import { User } from "#db/models/User";
import { APIError, type TypedRequest } from "#utils";

const deleteUser = async (
	req: TypedRequest<never, { id: string }>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const user = await User.findByPk(id);

		if (!user) throw new APIError(404);

		await user.destroy();

		res.status(204).send();
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { deleteUser };
