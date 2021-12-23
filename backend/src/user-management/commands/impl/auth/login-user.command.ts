import { LoginUserDto } from '~user-management/public-contracts/dtos/auth/login-user.dto';
import { PublicContext } from '~utils/context/public-context';
import { IDomainCommand } from '~utils/generics/interfaces/domain-command.interface';

type CommandPayload = LoginUserDto;
type CommandData = { context: PublicContext; payload: CommandPayload };

export class LoginUserCommand implements IDomainCommand<CommandPayload> {

    readonly data: CommandData;
    readonly name: string;

    constructor(data: CommandData) {
        this.data = data;
        this.name = LoginUserCommand.name;
    }
}
