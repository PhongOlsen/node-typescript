import { Router } from 'express';
import authRouter from './authRouter';

const noAuthorizeRouter = Router();
noAuthorizeRouter.use(authRouter);

export default noAuthorizeRouter;