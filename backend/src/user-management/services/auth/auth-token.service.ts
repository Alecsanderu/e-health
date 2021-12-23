import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '~config/services/app-config.service';
import { IAuthToken } from '~user-management/interfaces/auth/auth-token.interface';

@Injectable()
export class AuthTokenService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: AppConfigService,
    ) {
    }

    generateToken(data: { userId: string }): IAuthToken {

        const { userId } = data;

        return {
            token : this.jwtService.sign(
                {
                    sub: userId,
                },
            ),
            expire: this.configService.jwtTokenExpirationAsTimestamp(),
        };
    }
}
