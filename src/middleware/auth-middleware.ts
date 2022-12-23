import { getValue } from './../utils/ObjectUtils';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { verifyAccessToken } from '../utils/JwtUtils';
class AuthorizeMiddleware {
    public validateToken(req: Request, res: Response, next: NextFunction) {
        const unauthorized = () => {
            res.status(401);
            return res.status(403).json({
                message: 'unauthorized'
            });
        }
        const token = getValue(req.headers, '', 'accesstoken');
        if (token) return verifyAccessToken(token, unauthorized, next);
        return unauthorized();
    }

    public hashPassword = async (req: Request, res: Response, next: NextFunction) => {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        return next();
    }
};

export = new AuthorizeMiddleware();