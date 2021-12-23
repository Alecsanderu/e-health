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
import { CreateDepartmentDto } from '~hospital-management/public-contracts/dtos/create-department.dto';
import { DepartmentDto } from '~hospital-management/public-contracts/dtos/department.dto';
import { DepartmentService } from '~hospital-management/services/department.service';
import { AuthenticatedContext } from '~utils/context/authenticated-context';
import { HttpErrorResponseDto } from '~utils/exceptions/http-error-response.dto';
import { BaseController } from '~utils/generics/models/base-controller';

@Controller( 'departments' )
@ApiTags( SwaggerTags.Departments )
@ApiSecurity( 'bearer' )
@UseGuards( AuthGuard( 'jwt' ) )
export class DepartmentController extends BaseController {

    constructor(
        private readonly deptService: DepartmentService,
    ) {
        super();
    }

    @Get()
    @HttpCode( HttpStatus.OK )
    @ApiBadRequestResponse( { description: 'Invalid data provided', type: HttpErrorResponseDto } )
    @ApiGatewayTimeoutResponse( { description: 'Server unavailable' } )
    @ApiInternalServerErrorResponse( { description: 'Internal server error' } )
    @ApiOkResponse( { description: 'Department list', type: DepartmentDto, isArray: true } )
    @ApiUnauthorizedResponse( { description: 'User not authenticated' } )
    async getAllDepartments(@Headers() headers: any, @Request() request: any): Promise<DepartmentDto[]> {
        const context = this.getContext<AuthenticatedContext>( headers, request );
        return await this.deptService.getAllDepartments( context );
    }

    @Post()
    @HttpCode( HttpStatus.CREATED )
    @ApiBadRequestResponse( { description: 'Invalid data provided', type: HttpErrorResponseDto } )
    @ApiGatewayTimeoutResponse( { description: 'Server unavailable' } )
    @ApiInternalServerErrorResponse( { description: 'Internal server error' } )
    @ApiBody( { type: CreateDepartmentDto, description: 'Create dept data' } )
    @ApiCreatedResponse( { description: 'Dept created', type: DepartmentDto } )
    async createUser(@Headers() headers: any, @Request() request: any, @Body() data: CreateDepartmentDto): Promise<DepartmentDto> {
        const context = this.getContext<AuthenticatedContext>( headers, request );
        return await this.deptService.createDepartment( context, data );
    }
}
