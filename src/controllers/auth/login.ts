import { RequestHandler, Request, Response, NextFunction } from 'express';
import AuthService from '../../services/auth-service';
import { getValue } from '../../utils/ObjectUtils';
import bcrypt from 'bcrypt';
import { genarateToken, refreshTokens } from '../../utils/JwtUtils';

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const password = getValue(req.body, '', 'password');
        const userName = getValue(req.body, '', 'userName');

        const user = await AuthService.login(userName);

        if (!user) return res.status(400).json({ message: 'Wrong userName!' });

        // Using bcrypt compare password user with password in database;
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(404).json({ message: 'Wrong password!' });

        if (user && validPassword) {

            // Using jwt genarate accessToken and refreshToken
            const accessToken = genarateToken(user, process.env.JWT_ACCESS_KEY || '', '30s');
            const refreshToken: string = genarateToken(user, process.env.JWT_REFRESH_KEY as string, '365d');

            refreshTokens.push(refreshToken);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });

            // Remove password when return value for user
            const { password, ...other } = user._doc;

            return res.status(200).json({ data: { ...other, accessToken, refreshToken }, message: 'success!' })
        };
        next();
    } catch (error) {
        next(error);
    }
}