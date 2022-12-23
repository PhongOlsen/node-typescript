import { AuthDocument, CreateAccount, Login } from './../models/AuthSchema';
class AuthService {
    public async register(auth: AuthDocument): Promise<AuthDocument> {
        const response = await CreateAccount(auth);
        return response;
    };

    public async login(userName: string): Promise<any> {
        const response = await Login(userName);
        return response;
    }
};

export default new AuthService;