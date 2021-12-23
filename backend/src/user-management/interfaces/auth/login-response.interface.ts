import { IAuthToken } from '~user-management/interfaces/auth/auth-token.interface';
import { User } from '~user-management/models/user';

export interface ILoginResult {
    user: User;
    authToken: IAuthToken;
}
