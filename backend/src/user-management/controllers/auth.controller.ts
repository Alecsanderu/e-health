import { Body, Controller, Headers, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiGatewayTimeoutResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerTags } from '~config/constants/swagger.constant';
import { LoginSuccessDto } from '~user-management/public-contracts/dtos/auth/login-success.dto';
import { LoginUserDto } from '~user-management/public-contracts/dtos/auth/login-user.dto';
import { RegisterUserDto } from '~user-management/public-contracts/dtos/auth/register-user.dto';
import { UserDto } from '~user-management/public-contracts/dtos/user/user.dto';
import { AuthService } from '~user-management/services/auth/auth.service';
import { PublicContext } from '~utils/context/public-context';
import { HttpErrorResponseDto } from '~utils/exceptions/http-error-response.dto';
import { BaseController } from '~utils/generics/models/base-controller';

@Controller( 'auth' )
@ApiTags( SwaggerTags.Auth )
export class AuthController extends BaseController {

    constructor(private readonly authService: AuthService) {
        super();
    }

    @Post( 'register' )
    @HttpCode( HttpStatus.CREATED )
    @ApiBadRequestResponse( { description: 'Invalid data provided', type: HttpErrorResponseDto } )
    @ApiGatewayTimeoutResponse( { description: 'Server unavailable' } )
    @ApiInternalServerErrorResponse( { description: 'Internal server error' } )
    @ApiBody( { type: RegisterUserDto, description: 'Registration data' } )
    @ApiCreatedResponse( { description: 'User created', type: UserDto } )
    async createUser(@Headers() headers: any, @Request() request: any, @Body() data: RegisterUserDto): Promise<UserDto> {
        const context = this.getContext<PublicContext>( headers, request );
        return await this.authService.registerUser( context, data );
    }

    @Post( 'login' )
    @HttpCode( HttpStatus.OK )
    @ApiBadRequestResponse( { description: 'Invalid data provided', type: HttpErrorResponseDto } )
    @ApiGatewayTimeoutResponse( { description: 'Server unavailable' } )
    @ApiInternalServerErrorResponse( { description: 'Internal server error' } )
    @ApiBody( { type: LoginUserDto } )
    @ApiOkResponse( { type: LoginSuccessDto, description: 'User logged in' } )
    @ApiUnauthorizedResponse( { description: 'Login failed' } )
    async loginUser(@Headers() headers: any, @Request() request: any, @Body() data: LoginUserDto): Promise<LoginSuccessDto> {
        const context = this.getContext<PublicContext>( headers, request );
        return await this.authService.loginUser( context, data );
    }
}
