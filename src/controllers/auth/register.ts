import { HttpStatus } from './../../utils/constant/http-status';
import { getValue } from './../../utils/ObjectUtils';
import { AuthDocument } from './../../models/AuthSchema';
import { RequestHandler, Request, Response, NextFunction } from "express";
import AuthService from '../../services/auth-service';
import ApplicationError from '../../utils/errors/application-error';

export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authPayload = {} as AuthDocument;
        authPayload.userName = getValue(req.body, '', 'userName');
        authPayload.fullName = getValue(req.body, '', 'fullName');
        authPayload.password = getValue(req.body, '', 'password');
        const account: AuthDocument = await AuthService.register(authPayload);
        res.status(HttpStatus.OK).json({
            message: 'Success',
            data: account
        });
        next();
    } catch (error) {
        next(error);
    }
};