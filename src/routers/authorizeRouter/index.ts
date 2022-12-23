import { Router } from 'express';
import accountRouter from './account.router';
import productRouter from './product.router';
import authMiddleware from '../../middleware/auth-middleware';

const authorizeRouter = Router();

authorizeRouter.use(authMiddleware.validateToken);
authorizeRouter.use(accountRouter);
authorizeRouter.use(productRouter);

export default authorizeRouter;