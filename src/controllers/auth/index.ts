import Joi from '@hapi/joi';
import { register } from './register';
import { login } from './login';
export {
    register, login
};

export const middlewareRegisterUserValidate = Joi.object().keys({
    userName: Joi.string().required().max(128),
    fullName: Joi.string().required().max(200),
    password: Joi.string().required().max(200)
})