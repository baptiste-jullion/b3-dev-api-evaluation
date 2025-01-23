import type { Request, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

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
	user: string;
}

interface MayBeAuthenticatedRequest<
	// biome-ignore lint/suspicious/noExplicitAny : any is needed here
	Body = never | any,
	Params extends ParamsDictionary = ParamsDictionary,
> extends TypedRequest<Body, Params> {
	user?: string;
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
	type TypedRequest,
	type AuthenticatedRequest,
	type MayBeAuthenticatedRequest,
	type SequelizeDefaultAttributes,
	APIError,
};
