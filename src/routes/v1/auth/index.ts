import { login } from "@c/v1/auth/login";
import { register } from "@c/v1/auth/register";
import { ZUserWriteLogin } from "@db/models/User";
import { handleBody } from "@m/validation";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post(
	"/login",
	(req, res, next) => handleBody(ZUserWriteLogin, req, res, next),
	login,
);

export { authRouter };
