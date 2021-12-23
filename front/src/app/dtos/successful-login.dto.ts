import { JwtTokenDto } from './jwt-token.dto';
import { UserDto } from './user.dto';

export interface SuccessfulLoginDto {
    authToken: JwtTokenDto;
    user: UserDto;
}
