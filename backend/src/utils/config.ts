import { config as loadEnv } from 'dotenv';
import path from 'path';
const rootPath = process.cwd();
loadEnv();

export const config = {
	env: process.env.NODE_ENV || 'development',

	isProd: process.env.NODE_ENV === 'production',
	isDev: process.env.NODE_ENV === 'development',

	db: {
		type: 'postgres' as const,
		username: process.env.DB_USERNAME || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		database: process.env.DB_DATABASE || 'inventory',
		host: process.env.DB_HOST || 'localhost',
		port: parseInt(process.env.DB_PORT || '5432', 10),
		synchronize: false,
		logging: process.env.NODE_ENV === 'development',
	},
	orm: {
		synchronize: false,
		logging: process.env.NODE_ENV === 'development',
		entitiesPath: process.env.NODE_ENV === 'production'
			? path.join(rootPath, 'dist/entity/**/*.js')
			: path.join(rootPath, 'src/entity/**/*.ts'),
		migrationsPath: process.env.NODE_ENV === 'production'
			? path.join(rootPath, 'dist/db/migration/**/*.js')
			: path.join(rootPath, 'src/db/migration/**/*.ts'),
	},

	postgres: {
		user: process.env.POSTGRES_USER || 'postgres',
		password: process.env.POSTGRES_PASSWORD || 'postgres',
		database: process.env.POSTGRES_DB || 'inventory',
		port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
	},

	server: {
		backendPort: parseInt(process.env.BACKEND_PORT || '3000', 10),
	}
};
