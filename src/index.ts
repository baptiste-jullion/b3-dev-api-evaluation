import { config } from "dotenv";
import express from "express";
import { sequelizeInstance } from "#db/index";
import "#db/models/index";

import { apiRouter } from "./routes";

config();

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

const { API_PORT } = process.env;
app.listen(API_PORT, () => {
	console.log("API is up");
});

sequelizeInstance.sync({ alter: true });
