import { Router } from 'express';
import { validate } from '../middlewares/validate';
import {
	CreateProductSchema,
	UpdateProductSchema,
	GetProductsQuerySchema,
	IdParamSchema
} from '../schemas/product.schema';
import * as controller from '../controllers/products.controller';
import { asyncHandler } from '../middlewares/asyncHandler';


const router = Router();

router.get(
	'/',
	validate({ query: GetProductsQuerySchema }),
	asyncHandler(controller.getProducts)
);

router.post(
	'/',
	validate({ body: CreateProductSchema }),
	asyncHandler(controller.createProduct)
);

router.put(
	'/:id',
	validate({ body: UpdateProductSchema, params: IdParamSchema }),
	asyncHandler(controller.updateProduct)
);

router.delete(
	'/:id',
	validate({ params: IdParamSchema }),
	asyncHandler(controller.deleteProduct)
);
export default router;
