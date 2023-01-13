import Joi from '@hapi/joi';
import { register } from './register';
import { login } from './login';
import { logout } from './logout';
import { handleRefreshToken } from './handleRefreshToken';

export {
    register, login, handleRefreshToken, logout
};

export const middlewareRegisterUserValidate = Joi.object().keys({
    userName: Joi.string().required().max(128),
    fullName: Joi.string().required().max(200),
    password: Joi.string().required().max(200)
})