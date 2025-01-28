import { sequelizeInstance } from "@db/index";
import { config } from "dotenv";
import express from "express";
import "@db/models/index";

import { apiRouter } from "./routes";

config();

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

const { API_PORT } = process.env;
app.listen(API_PORT, () => {
	console.log(`Server is running @ http://localhost:${API_PORT}`);
});

sequelizeInstance.sync({ alter: true });
