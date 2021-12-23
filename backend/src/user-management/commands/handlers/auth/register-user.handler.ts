import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from '~user-management/commands/impl/auth/register-user.command';
import { FailedToRegisterUserEvent } from '~user-management/events/impl/auth/failed-to-register-user.event';
import { UserRegisteredEvent } from '~user-management/events/impl/auth/user-registered.event';
import { DuplicateEmailException } from '~user-management/exceptions/user.exceptions';
import { User } from '~user-management/models/user';
import { RegisterUserDto } from '~user-management/public-contracts/dtos/auth/register-user.dto';
import { UserRepository } from '~user-management/repositories/user.repository';
import { IException } from '~utils/exceptions/exception.interface';
import { BaseSyncCommandHandler } from '~utils/generics/models/base-command-handler';
import { Result } from '~utils/result/result';
import { Failed, Ok } from '~utils/result/result.functions';

@CommandHandler( RegisterUserCommand )
export class RegisterUserHandler extends BaseSyncCommandHandler<RegisterUserCommand> {

    private readonly logger = new Logger( RegisterUserHandler.name );

    constructor(
        private readonly eventBus: EventBus,
        private readonly userRepository: UserRepository,
    ) {
        super();
    }

    async execute(command: RegisterUserCommand): Promise<Result<User>> {

        const { payload } = command.data;

        const userByEmail = await this.getUserByEmail( payload.email );

        if( userByEmail.isFailed ) {
            return this.failedCommand( command, ...userByEmail.errors );
        }

        const user = await this.createAndSaveUser( payload );

        if( user.isFailed ) {
            return this.failedCommand( command, ...user.errors );
        }

        return this.successfulCommand( command, user.value! );

    }

    protected failedCommand(command: RegisterUserCommand, ...errors: IException[]): Result<any> {
        const failedEvent = new FailedToRegisterUserEvent( { context: command.data.context, errors } );
        this.eventBus.publish( failedEvent );
        return Failed( ...errors );
    }

    protected successfulCommand(command: RegisterUserCommand, user: User): Result<User> {
        const successEvent = new UserRegisteredEvent( { context: command.data.context, payload: user } );
        this.eventBus.publish( successEvent );
        return Ok( user );
    }

    private async getUserByEmail(email: string): Promise<Result<User>> {

        const user = await this.userRepository.selectOneByEmail( email );

        if( !user.isNotFound ) {
            return Failed( new DuplicateEmailException() );
        }

        return Ok( user.value! );
    }

    private async createAndSaveUser(data: RegisterUserDto): Promise<Result<User>> {

        const user = User.create( data );

        if( user.isFailed ) {
            return Failed( ...user.errors );
        }

        const savedUser = await this.userRepository.save( user.value! );

        return Ok( savedUser );
    }
}
