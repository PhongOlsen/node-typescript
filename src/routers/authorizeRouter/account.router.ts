import { Router } from 'express';
import authMiddleware from '../../middleware/auth-middleware';

const accountRouter = Router();

// accountRouter.use(authMiddleware.validateToken);
accountRouter.get('/account', (req, res, next) => res.status(200).json({ message: 'success' }));

export default accountRouter;