import { Router } from 'express';

const accountRouter = Router();

accountRouter.get('/account', (req, res, next) => res.status(200).json({ message: 'success' }));

export default accountRouter;