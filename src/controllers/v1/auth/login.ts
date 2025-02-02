import { verify } from "argon2";
import type { Response } from "express";
import { sign } from "jsonwebtoken";
import { User, type UserWriteLogin } from "#db/models/User";
import { APIError, type TypedRequest } from "#utils";

const login = async (req: TypedRequest<UserWriteLogin>, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });

		if (!user) throw new APIError(401, "Invalid email or password");

		if (!(await verify(user.toJSON().password, password)))
			throw new APIError(401, "Invalid email or password");

		const platform = req.headers["user-agent"];

		const token = sign({ id: user.toJSON().id }, process.env.JWT_SECRET, {
			expiresIn: platform === "borne" ? "1h" : "30d",
		});

		res.json({ token });
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { login };
