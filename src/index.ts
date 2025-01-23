import { config } from "dotenv";
import express from "express";
import { sequelizeInstance } from "./db";
import "./db/models";

import { auth } from "./middlewares/auth.ts";
import { apiRouter } from "./routes";

config();

const app = express();
app.use(express.json());

app.use("/api", auth, apiRouter);

const { API_PORT } = process.env;
app.listen(API_PORT, () => {
	console.log(`Server is running @ http://localhost:${API_PORT}`);
});

sequelizeInstance.sync({ alter: true });
