import { Router } from "express";
import { createTag } from "#c/v1/tags/create";
import { deleteTag } from "#c/v1/tags/delete";
import { getTag } from "#c/v1/tags/get";
import { listTags } from "#c/v1/tags/list";
import { updateTag } from "#c/v1/tags/update";
import { ZTagWrite } from "#db/models/Tag";
import { handleBody } from "#m/validation";

const tagsRouter = Router();

tagsRouter.get("/", listTags);
tagsRouter.post(
	"/",
	(req, res, next) => handleBody(ZTagWrite, req, res, next),
	createTag,
);
tagsRouter.get("/:id", getTag);
tagsRouter.delete("/:id", deleteTag);
tagsRouter.patch(
	"/:id",
	(req, res, next) => handleBody(ZTagWrite.partial(), req, res, next),
	updateTag,
);

export { tagsRouter };
