import { DataSource } from 'typeorm';
import { config } from './config';


export const AppDataSource = new DataSource({
	type: config.db.type,
	host: config.db.host,
	port: config.db.port,
	username: config.db.username,
	password: config.db.password,
	database: config.db.database,
	synchronize: config.orm.synchronize,
	logging: config.orm.logging,
	entities: [config.orm.entitiesPath],
	migrations: [config.orm.migrationsPath],
});
