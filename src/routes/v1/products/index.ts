import { createProduct } from "@c/v1/products/create";
import { deleteProduct } from "@c/v1/products/delete";
import { getProduct } from "@c/v1/products/get";
import { listProducts } from "@c/v1/products/list";
import { updateProduct } from "@c/v1/products/update";
import { ZProductWrite } from "@db/models/Product";
import { handleBody } from "@m/validation";
import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/", listProducts);
productsRouter.post(
	"/",
	(req, res, next) => handleBody(ZProductWrite, req, res, next),
	createProduct,
);
productsRouter.get("/:id", getProduct);
productsRouter.delete("/:id", deleteProduct);
productsRouter.patch(
	"/:id",
	(req, res, next) => handleBody(ZProductWrite.partial(), req, res, next),
	updateProduct,
);

export { productsRouter };
