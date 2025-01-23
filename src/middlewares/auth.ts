import type { NextFunction, Response } from "express";
import { type JwtPayload, verify } from "jsonwebtoken";
import { User } from "../db/models";
import { APIError, type MayBeAuthenticatedRequest } from "../utils.ts";

const { JWT_SECRET } = process.env;

const auth = async (
	req: MayBeAuthenticatedRequest,
	res: Response,
	next: NextFunction,
	shouldBeAdmin = false,
) => {
	try {
		const { authorization } = req.headers;

		if (!authorization) throw new APIError(401);

		const [_, token] = authorization.split(" ");

		req.user = (verify(token, JWT_SECRET) as JwtPayload).email;

		const user = await User.findOne({ where: { email: req.user } });

		if (!user) throw new APIError(401);

		if (shouldBeAdmin && user.toJSON().role !== "admin")
			throw new APIError(403);

		next();
	} catch (error) {
		APIError.handleError(res, error);
	}

	return;
};

const admin = async (
	req: MayBeAuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	await auth(req, res, next, true);
};

export { auth, admin };
