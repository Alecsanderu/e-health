import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { head } from 'lodash';
import { LoginUserCommand } from '~user-management/commands/impl/auth/login-user.command';
import { RegisterUserCommand } from '~user-management/commands/impl/auth/register-user.command';
import { InvalidCredentialsException } from '~user-management/exceptions/auth.exceptions';
import { IJwtPayload } from '~user-management/interfaces/auth/jwt-payload.interface';
import { ILoginResult } from '~user-management/interfaces/auth/login-response.interface';
import { modelToUserDto } from '~user-management/mappers/user.mappers';
import { User } from '~user-management/models/user';
import { LoginSuccessDto } from '~user-management/public-contracts/dtos/auth/login-success.dto';
import { LoginUserDto } from '~user-management/public-contracts/dtos/auth/login-user.dto';
import { RegisterUserDto } from '~user-management/public-contracts/dtos/auth/register-user.dto';
import { UserDto } from '~user-management/public-contracts/dtos/user/user.dto';
import { UserRepository } from '~user-management/repositories/user.repository';
import { PublicContext } from '~utils/context/public-context';
import { Result } from '~utils/result/result';
import { ValidationChain } from '~utils/validation/validation-chain';

@Injectable()
export class AuthService {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly userRepository: UserRepository,
    ) {
    }

    async registerUser(context: PublicContext, payload: RegisterUserDto): Promise<UserDto> {

        const command = new RegisterUserCommand( { context, payload } );
        const result: Result<User> = await this.commandBus.execute( command );

        if( result.isFailed ) {
            throw new BadRequestException( result.errors );
        }

        return modelToUserDto( result.value! );
    }

    async loginUser(context: PublicContext, payload: LoginUserDto): Promise<LoginSuccessDto> {

        const validation = ValidationChain.validate<typeof payload>()
                                          .isNotEmpty( payload.email, 'email' )
                                          .isNotEmpty( payload.password, 'password' )
                                          .getResult();

        if( validation.isFailed ) {
            throw new BadRequestException( validation.errors );
        }

        const command = new LoginUserCommand( { context, payload } );
        const result: Result<ILoginResult> = await this.commandBus.execute( command );

        if( result.isFailed ) {

            const error = head( result.errors );

            if( error instanceof InvalidCredentialsException ) {
                throw new UnauthorizedException();
            }

            throw new BadRequestException( result.errors );
        }

        return {
            user     : modelToUserDto( result.value!.user ),
            authToken: result.value!.authToken,
        };
    }

    async validateToken(payload: IJwtPayload): Promise<User | null> {

        const user = await this.userRepository.selectOneById( payload.sub );

        if( user.isFailed ) {
            throw new Error( JSON.stringify( user.errors ) );
        }

        if( user.isNotFound ) {
            return null;
        }

        return user.value!;
    }
}
