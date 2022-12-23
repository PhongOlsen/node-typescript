import { HttpStatus } from './../../utils/constant/http-status';
import { getValue } from './../../utils/ObjectUtils';
import { AuthDocument } from './../../models/AuthSchema';
import { RequestHandler, Request, Response, NextFunction } from "express";
import AuthService from '../../services/auth-service';
import { nowAsMillis } from '../../utils/DateUtils';
import { AuditDocument } from '../../models/BaseChema';

export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authPayload = {} as AuthDocument;
        authPayload.userName = getValue(req.body, '', 'userName');
        authPayload.fullName = getValue(req.body, '', 'fullName');
        authPayload.password = getValue(req.body, '', 'password');
        authPayload.base = {} as AuditDocument;
        authPayload.base.createdBy = '63a4836b7990d2d4068e7295';
        authPayload.base.updatedDate = nowAsMillis();
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