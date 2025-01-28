import { createUser } from "@c/v1/users/create";
import { deleteUser } from "@c/v1/users/delete";
import { getUser } from "@c/v1/users/get";
import { listUsers } from "@c/v1/users/list";
import { updateUser } from "@c/v1/users/update";
import { ZUserWrite } from "@db/models/User";
import { handleBody } from "@m/validation";
import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", listUsers);
usersRouter.post(
	"/",
	(req, res, next) => handleBody(ZUserWrite, req, res, next),
	createUser,
);
usersRouter.get("/:id", getUser);
usersRouter.delete("/:id", deleteUser);
usersRouter.patch(
	"/:id",
	(req, res, next) => handleBody(ZUserWrite.partial(), req, res, next),
	updateUser,
);

export { usersRouter };
