import { AuthDocument, CreateAccount } from './../models/AuthSchema';
class AuthService {
    public async register(auth: AuthDocument): Promise<AuthDocument> {
        const response = await CreateAccount(auth);
        return response;
    }
};

export default new AuthService;