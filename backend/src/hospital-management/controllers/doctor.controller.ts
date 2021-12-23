import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiGatewayTimeoutResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiSecurity,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerTags } from '~config/constants/swagger.constant';
import { CreateDoctorDto } from '~hospital-management/public-contracts/dtos/create-doctor.dto';
import { DoctorDto } from '~hospital-management/public-contracts/dtos/doctor.dto';
import { DoctorService } from '~hospital-management/services/doctor.service';
import { AuthenticatedContext } from '~utils/context/authenticated-context';
import { HttpErrorResponseDto } from '~utils/exceptions/http-error-response.dto';
import { BaseController } from '~utils/generics/models/base-controller';

@Controller( 'doctors' )
@ApiTags( SwaggerTags.Doctors )
@ApiSecurity( 'bearer' )
@UseGuards( AuthGuard( 'jwt' ) )
export class DoctorController extends BaseController {

    constructor(
        private readonly doctorService: DoctorService,
    ) {
        super();
    }

    @Get()
    @HttpCode( HttpStatus.OK )
    @ApiBadRequestResponse( { description: 'Invalid data provided', type: HttpErrorResponseDto } )
    @ApiGatewayTimeoutResponse( { description: 'Server unavailable' } )
    @ApiInternalServerErrorResponse( { description: 'Internal server error' } )
    @ApiOkResponse( { description: 'Doctor list', type: DoctorDto, isArray: true } )
    @ApiUnauthorizedResponse( { description: 'User not authenticated' } )
    async getAllDoctors(@Headers() headers: any, @Request() request: any): Promise<DoctorDto[]> {
        const context = this.getContext<AuthenticatedContext>( headers, request );
        return await this.doctorService.getAllDoctors( context );
    }

    @Post()
    @HttpCode( HttpStatus.CREATED )
    @ApiBadRequestResponse( { description: 'Invalid data provided', type: HttpErrorResponseDto } )
    @ApiGatewayTimeoutResponse( { description: 'Server unavailable' } )
    @ApiInternalServerErrorResponse( { description: 'Internal server error' } )
    @ApiBody( { type: CreateDoctorDto, description: 'Create doctor data' } )
    @ApiCreatedResponse( { description: 'Doctor created', type: DoctorDto } )
    async createUser(@Headers() headers: any, @Request() request: any, @Body() data: CreateDoctorDto): Promise<DoctorDto> {
        const context = this.getContext<AuthenticatedContext>( headers, request );
        return await this.doctorService.createDoctor( context, data );
    }
}
