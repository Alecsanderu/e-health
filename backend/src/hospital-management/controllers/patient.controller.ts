import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiGatewayTimeoutResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiParam,
    ApiSecurity,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerTags } from '~config/constants/swagger.constant';
import { CreatePatientDto } from '~hospital-management/public-contracts/dtos/create-patient.dto';
import { PatientDto } from '~hospital-management/public-contracts/dtos/patient.dto';
import { PatientService } from '~hospital-management/services/patient.service';
import { AuthenticatedContext } from '~utils/context/authenticated-context';
import { HttpErrorResponseDto } from '~utils/exceptions/http-error-response.dto';
import { BaseController } from '~utils/generics/models/base-controller';

@Controller( 'patients' )
@ApiTags( SwaggerTags.Patients )
@ApiSecurity( 'bearer' )
@UseGuards( AuthGuard( 'jwt' ) )
export class PatientController extends BaseController {

    constructor(
        private readonly patientService: PatientService,
    ) {
        super();
    }

    @Get()
    @HttpCode( HttpStatus.OK )
    @ApiBadRequestResponse( { description: 'Invalid data provided', type: HttpErrorResponseDto } )
    @ApiGatewayTimeoutResponse( { description: 'Server unavailable' } )
    @ApiInternalServerErrorResponse( { description: 'Internal server error' } )
    @ApiOkResponse( { description: 'Patient list', type: PatientDto, isArray: true } )
    @ApiUnauthorizedResponse( { description: 'User not authenticated' } )
    async getAllPatients(@Headers() headers: any, @Request() request: any): Promise<PatientDto[]> {
        const context = this.getContext<AuthenticatedContext>( headers, request );
        return await this.patientService.getAllPatients( context );
    }

    @Post()
    @HttpCode( HttpStatus.CREATED )
    @ApiBadRequestResponse( { description: 'Invalid data provided', type: HttpErrorResponseDto } )
    @ApiGatewayTimeoutResponse( { description: 'Server unavailable' } )
    @ApiInternalServerErrorResponse( { description: 'Internal server error' } )
    @ApiBody( { type: CreatePatientDto, description: 'Create patient data' } )
    @ApiCreatedResponse( { description: 'Patient created', type: PatientDto } )
    async createPatient(@Headers() headers: any, @Request() request: any, @Body() data: CreatePatientDto): Promise<PatientDto> {
        const context = this.getContext<AuthenticatedContext>( headers, request );
        return await this.patientService.createPatient( context, data );
    }

    @Post( ':id/check-out' )
    @HttpCode( HttpStatus.OK )
    @ApiBadRequestResponse( { description: 'Invalid data provided', type: HttpErrorResponseDto } )
    @ApiGatewayTimeoutResponse( { description: 'Server unavailable' } )
    @ApiInternalServerErrorResponse( { description: 'Internal server error' } )
    @ApiOkResponse( { description: 'Patient checked out', type: PatientDto } )
    @ApiParam( { name: 'id', required: true } )
    async checkOutPatient(@Headers() headers: any, @Request() request: any, @Param( 'id' ) patientId: string): Promise<PatientDto> {
        const context = this.getContext<AuthenticatedContext>( headers, request );
        return await this.patientService.checkOutPatient( context, patientId );
    }
}
