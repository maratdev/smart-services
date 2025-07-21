import { Router } from 'express';
import productRoutes from './products';

const router = Router();

router.use('/products', productRoutes);

export default router;
