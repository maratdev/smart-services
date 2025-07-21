import { Request, Response, NextFunction } from 'express';
import { Product } from '../entity/Product';
import { AppDataSource } from '../utils/data-source';
import { StatusCodes } from 'http-status-codes';

const repo = AppDataSource.getRepository(Product);

export async function getProducts(req: Request, res: Response, next: NextFunction) {
	try {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 5;

		const [products, total] = await Promise.all([
			repo.find({
				skip: (page - 1) * limit,
				take: limit,
				order: { id: 'ASC' },
			}),
			repo.count(),
		]);

		res.status(StatusCodes.OK).json({ products, total });
	} catch (err) {
		next(err);
	}
}

export async function createProduct(req: Request, res: Response, next: NextFunction) {
	try {
		const { article, name, price, quantity } = req.body;
		const existing = await repo.findOneBy({ article });

		if (existing) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				field: 'article',
				message: 'Артикул уже существует',
			});
		}

		const product = repo.create({ article, name, price, quantity });
		await repo.save(product);

		res.status(StatusCodes.CREATED).json(product);
	} catch (err) {
		next(err);
	}
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
	try {
		const id = Number(req.params.id);
		const { article, name, price, quantity } = req.body;

		if (article) {
			const existing = await repo.findOne({ where: { article } });
			if (existing) {}
			if (existing && existing.id !== id) {
				return res.status(StatusCodes.BAD_REQUEST).json({ field: 'article', message: 'Артикул уже существует' });
			}
		}

		const product = await repo.findOneBy({ id });

		if (!product) {
			return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
		}

		repo.merge(product, { article, name, price, quantity });
		const result = await repo.save(product);

		res.status(StatusCodes.OK).json(result);
	} catch (err) {
		next(err);
	}
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
	try {
		const id = Number(req.params.id);
		const product = await repo.findOneBy({ id });

		if (!product) {
			return res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
		}
		await repo.delete(id);
		res.status(StatusCodes.NO_CONTENT).send();
	} catch (err) {
		next(err);
	}
}
