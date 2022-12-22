import { login } from './../../controllers/auth/login';
import { Router } from 'express';
import * as AuthController from '../../controllers/auth'
import requestMiddleware from '../../middleware/request-middleware';

const authRouter = Router();

authRouter.post('/auth/register', requestMiddleware.validateRequestBody(AuthController.register, {
    validation: { body: AuthController.middlewareRegisterUserValidate }
}));

authRouter.post('/auth/login', AuthController.login);

export default authRouter;