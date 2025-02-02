import { createTag } from "@c/v1/tags/create";
import { deleteTag } from "@c/v1/tags/delete";
import { getTag } from "@c/v1/tags/get";
import { listTags } from "@c/v1/tags/list";
import { updateTag } from "@c/v1/tags/update";
import { ZTagWrite } from "@db/models/Tag";
import { validateBody } from "@m/validation";
import { Router } from "express";

const tagsRouter = Router();

tagsRouter.get("/", listTags);
tagsRouter.post("/", validateBody(ZTagWrite), createTag);
tagsRouter.get("/:id", getTag);
tagsRouter.delete("/:id", deleteTag);
tagsRouter.patch("/:id", validateBody(ZTagWrite.partial()), updateTag);

export { tagsRouter };
