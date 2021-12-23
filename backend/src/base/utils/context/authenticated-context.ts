import { User } from '~user-management/models/user';
import { IContext } from '~utils/context/context.interface';

export class AuthenticatedContext implements IContext<User> {

    user: User;

    constructor(user: User) {
        this.user = user;
    }
}
