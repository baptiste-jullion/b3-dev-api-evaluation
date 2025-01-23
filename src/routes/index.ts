import { Router } from "express";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
	res.json({
		message: "Hello, World!",
	});
});

export { apiRouter };
