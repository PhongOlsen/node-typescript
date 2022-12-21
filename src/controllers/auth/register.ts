import { RequestHandler, Request, Response, NextFunction } from "express";

export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        name: 'La Thanh Phong'
    });
};