import { Router } from "express";
import { login } from "../../../controllers/v1/auth/login";
import { register } from "../../../controllers/v1/auth/register";
import { ZUserWriteLogin } from "../../../db/models/User.ts";
import { handleBody } from "../../../middlewares/serializer.ts";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post(
	"/login",
	(req, res, next) => handleBody(ZUserWriteLogin, req, res, next),
	login,
);

export { authRouter };
