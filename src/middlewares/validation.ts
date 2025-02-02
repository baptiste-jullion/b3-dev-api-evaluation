import { APIError } from "@utils";
import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";

const validateBody =
	<T>(schema: z.ZodType<T>) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			req.body = schema.parse(req.body);
			next();
		} catch (error) {
			APIError.handleError(res, {
				message: "Invalid request body",
				details: error,
			});
		}
	};

export { validateBody };
