import type { Request, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

const extractPaginationInfosFromRequest = (req: Request) => {
	const page = Number.parseInt(req.query.page as string) || 1;
	const limit = Number.parseInt(req.query.limit as string) || 10;

	if (limit < 0 || limit > 100 || page < 1)
		throw new APIError(
			400,
			"Invalid pagination parameters. Allowed values are limit between 1 and 100 and page >= 1",
		);

	return {
		page,
		limit,
	};
};

interface TypedRequest<
	Body = never,
	Params extends ParamsDictionary = ParamsDictionary,
> extends Request {
	body: Body;
	params: Params;
}

interface AuthenticatedRequest<
	Body = never,
	Params extends ParamsDictionary = ParamsDictionary,
> extends TypedRequest<Body, Params> {
	user: number;
}

interface MayBeAuthenticatedRequest<
	// biome-ignore lint/suspicious/noExplicitAny : any is needed here
	Body = never | any,
	Params extends ParamsDictionary = ParamsDictionary,
> extends TypedRequest<Body, Params> {
	user?: number;
}

interface SequelizeDefaultAttributes {
	createdAt: Date;
	updatedAt: Date;
	id: number;
}

class APIError {
	status: number;
	message: string;

	constructor(status: number, message?: string) {
		this.status = status;
		this.message = message || APIError.defaultMessage(status);
	}

	static defaultMessage(status: number) {
		switch (status) {
			case 400:
				return "Bad Request";
			case 401:
				return "Unauthorized";
			case 403:
				return "Forbidden";
			case 404:
				return "Not Found";
			case 500:
				return "Internal Server Error";
			default:
				return "An error occurred";
		}
	}

	static handleError(res: Response, error: APIError | unknown) {
		if (error instanceof APIError) {
			res.status(error.status).json({ error: error.message });
			return;
		}
		res.status(500).json({ error });
	}
}

export {
	extractPaginationInfosFromRequest,
	type TypedRequest,
	type AuthenticatedRequest,
	type MayBeAuthenticatedRequest,
	type SequelizeDefaultAttributes,
	APIError,
};
