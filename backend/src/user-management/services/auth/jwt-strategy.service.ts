import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from '~config/constants/providers.constant';
import { AppConfigService } from '~config/services/app-config.service';
import { IJwtPayload } from '~user-management/interfaces/auth/jwt-payload.interface';
import { User } from '~user-management/models/user';
import { AuthService } from '~user-management/services/auth/auth.service';
import { valueIsEmpty } from '~utils/validation/is-empty.function';

@Injectable()
export class JwtStrategyService extends PassportStrategy( Strategy, 'jwt' ) {

    constructor(
        private readonly configService: AppConfigService,
        private readonly authService: AuthService,
        @Inject( JWT_SECRET )
        private readonly jwtSecret: string,
    ) {
        super( {
                   jwtFromRequest  : ExtractJwt.fromAuthHeaderWithScheme( 'bearer' ),
                   ignoreExpiration: false,
                   secretOrKey     : jwtSecret,
               } );
    }

    async validate(payload: IJwtPayload): Promise<User> {

        if( payload?.temporary === true ) {
            throw new UnauthorizedException( 'Unauthorized' );
        }

        const result = await this.authService.validateToken( payload );

        if( valueIsEmpty( result ) ) {
            throw new UnauthorizedException( 'Unauthorized' );
        }

        return result!;
    }

}
