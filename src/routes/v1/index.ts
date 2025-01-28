import { admin } from "@m/auth";
import { Router } from "express";
import { authRouter } from "./auth";
import { productsRouter } from "./products";
import { tagsRouter } from "./tags";
import { usersRouter } from "./users";

const v1Router = Router();

v1Router.use("/products", productsRouter);
v1Router.use("/tags", tagsRouter);
v1Router.use("/users", admin, usersRouter);
v1Router.use("/auth", authRouter);

export { v1Router };
