import { RequestHandler, Request, Response, NextFunction } from 'express';
import AuthService from '../../services/auth-service';
import { getValue } from '../../utils/ObjectUtils';
import bcrypt from 'bcrypt';
import { genarateAccessToken, refreshTokens } from '../../utils/JwtUtils';

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const password = getValue(req.body, '', 'password');
        const userName = getValue(req.body, '', 'userName');
        const user = await AuthService.login(userName);
        if (!user) return res.status(400).json({ message: 'Wrong userName!' });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(404).json({ message: 'Wrong password!' });
        if (user && validPassword) {
            const { password, ...other } = user._doc;
            const accessToken = genarateAccessToken(user);
            return res.status(200).json({ data: { ...other, accessToken }, message: 'success!' })
        }
        next();
    } catch (error) {
        next(error);
    }
}