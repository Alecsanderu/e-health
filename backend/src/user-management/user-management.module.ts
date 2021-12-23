import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '~config/config.module';
import { JWT_SECRET } from '~config/constants/providers.constant';
import { AppConfigService } from '~config/services/app-config.service';
import { LoginUserHandler } from '~user-management/commands/handlers/auth/login-user.handler';
import { RegisterUserHandler } from '~user-management/commands/handlers/auth/register-user.handler';
import { AuthController } from '~user-management/controllers/auth.controller';
import { UserEntity } from '~user-management/entities/user.entity';
import { UserRepository } from '~user-management/repositories/user.repository';
import { AuthTokenService } from '~user-management/services/auth/auth-token.service';
import { AuthService } from '~user-management/services/auth/auth.service';
import { JwtStrategyService } from '~user-management/services/auth/jwt-strategy.service';

const CommandHandlers = [
    RegisterUserHandler,
    LoginUserHandler,
];

const Repositories = [
    UserRepository,
];

const Services = [
    AuthService,
    AuthTokenService,
    JwtStrategyService,
];

const Entities = [
    UserEntity,
];

const Controllers = [
    AuthController,
];

@Module(
    {
        controllers: [ ...Controllers ],
        providers  : [
            ...Services,
            ...CommandHandlers,
            ...Repositories,
            {
                provide   : JWT_SECRET,
                inject    : [ AppConfigService ],
                useFactory: (configService: AppConfigService) => configService.jwtSecret,
            },
        ],
        imports    : [
            CqrsModule,
            JwtModule.registerAsync(
                {
                    imports   : [ ConfigModule ],
                    inject    : [ AppConfigService ],
                    useFactory: (configService: AppConfigService) => (
                        {
                            secret     : configService.jwtSecret,
                            signOptions: {
                                expiresIn: configService.jwtTokenExpiration,
                            },
                        }
                    ),
                },
            ),
            TypeOrmModule.forFeature( [ ...Entities ] ),
        ],
    },
)
export class UserManagementModule {
}
