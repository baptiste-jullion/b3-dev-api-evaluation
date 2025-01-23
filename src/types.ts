declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_PORT: number;

			DB_NAME: string;
			DB_USER: string;
			DB_PASS: string;
			DB_HOST: string;
			DB_PORT: number;

			JWT_SECRET: string;
		}
	}
}
