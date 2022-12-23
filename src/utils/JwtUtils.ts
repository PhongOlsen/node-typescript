import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export let refreshTokens = [];

export const genarateAccessToken = (user: any) => {
    return jwt.sign({
        id: user._id,
        userName: user.userName,
    },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: '30s' }
    )
};

export const verifyAccessToken = (accessToken: string, unauthorizedCallback: () => void, next: NextFunction) => {
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error: any) => {
        if (error) unauthorizedCallback();
        return next();
    });
}