import { Router } from "express";
import { createProduct } from "#c/v1/products/create";
import { deleteProduct } from "#c/v1/products/delete";
import { getProduct } from "#c/v1/products/get";
import { listProducts } from "#c/v1/products/list";
import { updateProduct } from "#c/v1/products/update";
import { ZProductWrite } from "#db/models/Product";
import { admin } from "#m/auth";
import { validateBody } from "#m/validation";

const productsRouter = Router();

productsRouter.get("/", listProducts);
productsRouter.post("/", admin, validateBody(ZProductWrite), createProduct);
productsRouter.get("/:id", getProduct);
productsRouter.delete("/:id", admin, deleteProduct);
productsRouter.patch(
	"/:id",
	admin,
	validateBody(ZProductWrite.partial()),
	updateProduct,
);

export { productsRouter };
