import { RequestHandler, Request, Response, NextFunction } from 'express';
export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: 'Login Success !'
    })
}