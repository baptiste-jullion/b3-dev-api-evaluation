import type { NextFunction, Response } from "express";
import { type JwtPayload, verify } from "jsonwebtoken";
import { User } from "#db/models";
import { APIError, type MayBeAuthenticatedRequest } from "#utils";

const { JWT_SECRET } = process.env;

const auth =
	(shouldBeAdmin = false) =>
	async (req: MayBeAuthenticatedRequest, res: Response, next: NextFunction) => {
		try {
			const { authorization } = req.headers;

			if (!authorization) throw new APIError(401);

			const [_, token] = authorization.split(" ");

			req.user = (verify(token, JWT_SECRET) as JwtPayload).id;

			const user = await User.findByPk(req.user);

			if (!user) throw new APIError(401);

			if (shouldBeAdmin && user.toJSON().role !== "admin")
				throw new APIError(403);

			next();
		} catch (error) {
			if (error instanceof APIError) APIError.handleError(res, error);
			else APIError.handleError(res, new APIError(401));
		}

		return;
	};

const admin = async (
	req: MayBeAuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	await auth(true)(req, res, next);
};

export { auth, admin };
