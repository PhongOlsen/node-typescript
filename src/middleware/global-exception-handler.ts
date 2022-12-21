import { Request, Response, NextFunction } from 'express';
import ApplicationError from '../utils/errors/application-error';

class GlobalExceptionHandler {
    public static exceptionHandle(error: ApplicationError, req: Request, res: Response, next: NextFunction) {
        if (res.headersSent) {
            return next(error);
        }

        return res.status(error.status || 500).json({
            error: process.env.NODE_ENV === 'development' ? error : undefined,
            message: error.message
        })
    }
}

export { GlobalExceptionHandler };