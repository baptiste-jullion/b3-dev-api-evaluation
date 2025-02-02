import { Router } from "express";
import { admin, auth } from "#m/auth";
import { cartRouter } from "#r/v1/cart";
import { authRouter } from "./auth";
import { productsRouter } from "./products";
import { tagsRouter } from "./tags";
import { usersRouter } from "./users";

const v1Router = Router();

v1Router.use("/products", productsRouter);
v1Router.use("/tags", admin, tagsRouter);
v1Router.use("/users", admin, usersRouter);
v1Router.use("/auth", authRouter);
v1Router.use("/cart", auth(), cartRouter);

export { v1Router };
