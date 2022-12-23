import { Router } from 'express';

const productRouter = Router();

productRouter.get('/product', (req, res, next) => res.status(200).json({ message: 'success' }));

export default productRouter;