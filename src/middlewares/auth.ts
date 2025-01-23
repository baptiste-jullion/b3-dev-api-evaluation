import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const auth = async (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({
			message: "Authorization header is required",
		});
	}

	const [_, token] = authorization.split(" ");

	try {
		req.user = verify(token, JWT_SECRET);
		next();
	} catch (error) {
		return res.status(401).json({
			message: "Invalid token",
		});
	}

	return;
};

export { auth };
