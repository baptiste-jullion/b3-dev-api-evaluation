import { Router } from "express";
import { createProduct } from "#c/v1/products/create";
import { deleteProduct } from "#c/v1/products/delete";
import { getProduct } from "#c/v1/products/get";
import { listProducts } from "#c/v1/products/list";
import { updateProduct } from "#c/v1/products/update";
import { ZProductWrite } from "#db/models/Product";
import { validateBody } from "#m/validation";

const productsRouter = Router();

productsRouter.get("/", listProducts);
productsRouter.post("/", validateBody(ZProductWrite), createProduct);
productsRouter.get("/:id", getProduct);
productsRouter.delete("/:id", deleteProduct);
productsRouter.patch(
	"/:id",
	validateBody(ZProductWrite.partial()),
	updateProduct,
);

export { productsRouter };
