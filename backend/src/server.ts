import express, { Request, Response, NextFunction } from 'express';
import { config } from './utils/config';
import cors from 'cors';
import { AppDataSource } from './utils/data-source';
import logger from './utils/logger';
import router from './routes';
import { StatusCodes } from 'http-status-codes';

const app = express();

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	const status = err.status || err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	const message = err.message || 'Internal Server Error';

	res.status(status).json({ message });
};

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

AppDataSource.initialize()
	.then(() => {
		app.listen(Number(config.server.backendPort), () => logger.info(`Server running on http://localhost:${config.server.backendPort}`));
	})
	.catch((err) => logger.error(`Data Source initialization error: ${err}`));
