import { ApiProperty } from '@nestjs/swagger';
import { AuthTokenDto } from '~user-management/public-contracts/dtos/auth/auth-token.dto';
import { UserDto } from '~user-management/public-contracts/dtos/user/user.dto';

export class LoginSuccessDto {
    @ApiProperty()
    user: UserDto;
    @ApiProperty()
    authToken: AuthTokenDto;
}
