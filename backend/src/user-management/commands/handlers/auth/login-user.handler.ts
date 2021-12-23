import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { LoginUserCommand } from '~user-management/commands/impl/auth/login-user.command';
import { FailedToLoginUserEvent } from '~user-management/events/impl/auth/failed-to-login-user.event';
import { UserLoggedInEvent } from '~user-management/events/impl/auth/user-logged-in.event';
import { InvalidCredentialsException } from '~user-management/exceptions/auth.exceptions';
import { IAuthToken } from '~user-management/interfaces/auth/auth-token.interface';
import { ILoginResult } from '~user-management/interfaces/auth/login-response.interface';
import { User } from '~user-management/models/user';
import { UserRepository } from '~user-management/repositories/user.repository';
import { AuthTokenService } from '~user-management/services/auth/auth-token.service';
import { IException } from '~utils/exceptions/exception.interface';
import { matchHashPasswordTo } from '~utils/functions/password.functions';
import { BaseSyncCommandHandler } from '~utils/generics/models/base-command-handler';
import { Result } from '~utils/result/result';
import { Failed, Ok } from '~utils/result/result.functions';

@CommandHandler( LoginUserCommand )
export class LoginUserHandler extends BaseSyncCommandHandler<LoginUserCommand> {

    constructor(
        private readonly eventBus: EventBus,
        private readonly userRepository: UserRepository,
        private readonly authTokenService: AuthTokenService,
    ) {
        super();
    }

    async execute(command: LoginUserCommand): Promise<Result<ILoginResult>> {

        const { payload: { email, password } } = command.data;

        const user = await this.getUserByEmail( email );

        if( user.isFailed ) {
            return this.failedCommand( command, ...user.errors );
        }

        const result = this.validateLogin( user.value!, password );

        if( result.isFailed ) {
            return this.failedCommand( command, ...result.errors );
        }

        const authToken = this.generateToken( user.value! );

        return this.successfulCommand( command, { user: user.value!, authToken } );

    }

    protected failedCommand(command: LoginUserCommand, ...errors: IException[]): Result<any> {

        const { context } = command.data;
        const failedEvent = new FailedToLoginUserEvent( { context, errors } );

        this.eventBus.publish( failedEvent );

        return Failed( ...errors );
    }

    protected successfulCommand(command: LoginUserCommand, loginResult: ILoginResult): Result<ILoginResult> {

        const { context } = command.data;
        const successEvent = new UserLoggedInEvent( { context, payload: loginResult.user } );

        this.eventBus.publish( successEvent );

        return Ok( loginResult );
    }

    private async getUserByEmail(email: string): Promise<Result<User>> {

        const user = await this.userRepository.selectOneByEmail( email );

        if( user.isNotFound ) {
            return Failed( new InvalidCredentialsException() );
        }

        return Ok( user.value! );
    }

    private validateLogin(user: User, password: string): Result<any> {

        if( !matchHashPasswordTo( user.password, password ) ) {
            return Failed( new InvalidCredentialsException() );
        }

        return Ok();
    }

    private generateToken(user: User): IAuthToken {
        return this.authTokenService.generateToken( { userId: user.id } );
    }
}
