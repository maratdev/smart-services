import { z } from 'zod';

export const CreateProductSchema = z.object({
	name: z.string().min(1),
	article: z.string().min(1),
	price: z.number().positive(),
	quantity: z.number().int().nonnegative(),
});

export const UpdateProductSchema = z.object({
	name: z.string().min(1).optional(),
	article: z.string().min(1).optional(),
	price: z.number().positive().optional(),
	quantity: z.number().int().nonnegative().optional(),
});

export const GetProductsQuerySchema = z.object({
	page: z.coerce.number().default(1),
	limit: z.coerce.number().default(5),
});

export const IdParamSchema = z.object({
	id: z.coerce.number().int().positive(),
});
