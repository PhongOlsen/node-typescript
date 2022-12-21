import { Router } from 'express';
import * as AuthController from '../controllers/auth'
import requestMiddleware from '../middleware/request-middleware';

const authRouter = Router();

authRouter.get('/auth/register', requestMiddleware.validateRequestBody(AuthController.register));

export default authRouter;