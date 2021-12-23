import { RegisterUserDto } from '~user-management/public-contracts/dtos/auth/register-user.dto';
import { PublicContext } from '~utils/context/public-context';
import { IDomainCommand } from '~utils/generics/interfaces/domain-command.interface';

type Data = { context: PublicContext; payload: RegisterUserDto };

export class RegisterUserCommand implements IDomainCommand<RegisterUserDto> {

    readonly data: Data;
    readonly name: string;

    constructor(data: Data) {
        this.data = data;
        this.name = RegisterUserCommand.name;
    }
}
