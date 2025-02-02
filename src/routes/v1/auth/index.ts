import { login } from "@c/v1/auth/login";
import { register } from "@c/v1/auth/register";
import { ZUserWriteLogin } from "@db/models/User";
import { validateBody } from "@m/validation";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", validateBody(ZUserWriteLogin), login);

export { authRouter };
