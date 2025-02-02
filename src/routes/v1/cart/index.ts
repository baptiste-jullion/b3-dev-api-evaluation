import { Router } from "express";
import { command } from "#c/v1/cart/command";
import { deleteCart } from "#c/v1/cart/delete";
import { deleteCartItemByProductId } from "#c/v1/cart/deleteByProductId";
import { getCart } from "#c/v1/cart/get";
import { updateCart } from "#c/v1/cart/update";

const cartRouter = Router();

cartRouter.put("/", updateCart);
cartRouter.get("/", getCart);
cartRouter.delete("/", deleteCart);
cartRouter.delete("/:productId", deleteCartItemByProductId);
cartRouter.post("/command", command);

export { cartRouter };
