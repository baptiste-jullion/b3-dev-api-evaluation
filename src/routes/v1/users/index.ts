import { Router } from "express";
import { createUser } from "#c/v1/users/create";
import { deleteUser } from "#c/v1/users/delete";
import { getUser } from "#c/v1/users/get";
import { listUsers } from "#c/v1/users/list";
import { updateUser } from "#c/v1/users/update";
import { ZUserWrite } from "#db/models/User";
import { validateBody } from "#m/validation";

const usersRouter = Router();

usersRouter.get("/", listUsers);
usersRouter.post("/", validateBody(ZUserWrite), createUser);
usersRouter.get("/:id", getUser);
usersRouter.delete("/:id", deleteUser);
usersRouter.patch("/:id", validateBody(ZUserWrite.partial()), updateUser);

export { usersRouter };
