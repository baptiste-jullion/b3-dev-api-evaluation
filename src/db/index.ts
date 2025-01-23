import { Sequelize } from "sequelize";

const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } = process.env;

const sequelizeInstance = new Sequelize({
	database: DB_NAME,
	username: DB_USER,
	password: DB_PASS,
	host: DB_HOST,
	port: DB_PORT,
	dialect: "mysql",
	logging: process.env.NODE_ENV === "development" ? console.log : false,
});

export { sequelizeInstance };
