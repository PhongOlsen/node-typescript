import { Router } from 'express';
import authRouter from './authRouter';
import openAIRouter from './openAI';

const noAuthorizeRouter = Router();
noAuthorizeRouter.use(authRouter);
noAuthorizeRouter.use(openAIRouter);

export default noAuthorizeRouter;