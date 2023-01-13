import { getValue } from './../../utils/ObjectUtils';
import { RequestHandler, Request, Response, NextFunction } from 'express';

export const logout: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const token = getValue(req.body, '', 'accessToken');

    res.clearCookie('refreshToken');
    res.status(200).json({
        message: 'Logged out successfully!',
    });
};