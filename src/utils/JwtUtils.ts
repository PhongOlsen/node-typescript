import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export let refreshTokens: string[] = [];

export const genarateToken = (user: any, secrect_key: string, time_expiresIn: string) => {
    return jwt.sign({
        id: user._id,
        userName: user.userName,
    },
        secrect_key,
        { expiresIn: time_expiresIn }
    )
};

export const verifyAccessToken = (accessToken: string, unauthorizedCallback: () => void, next: NextFunction) => {
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY || '', (error: any) => {
        if (error) unauthorizedCallback();
        return next();
    });
}