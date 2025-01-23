import { Router } from "express";
import { createUser } from "../../../controllers/v1/users/create";
import { deleteUser } from "../../../controllers/v1/users/delete";
import { getUser } from "../../../controllers/v1/users/get";
import { listUsers } from "../../../controllers/v1/users/list";
import { updateUser } from "../../../controllers/v1/users/update";
import { ZUserWrite } from "../../../db/models/User";
import { handleBody } from "../../../middlewares/serializer";

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
