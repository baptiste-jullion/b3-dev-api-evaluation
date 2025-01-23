import { Router } from "express";
import { createProduct } from "../../../controllers/v1/products/create";
import { deleteProduct } from "../../../controllers/v1/products/delete";
import { getProduct } from "../../../controllers/v1/products/get";
import { listProducts } from "../../../controllers/v1/products/list";
import { updateProduct } from "../../../controllers/v1/products/update";
import { ZProductWrite } from "../../../db/models/Product";
import { handleBody } from "../../../middlewares/serializer";

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
