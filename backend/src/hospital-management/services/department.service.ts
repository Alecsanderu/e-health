import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateDepartmentCommand } from '~hospital-management/commands/impl/departments/create-department.command';
import { modelListToDepartmentDtoList, modelToDepartmentDto } from '~hospital-management/mappers/department.mappers';
import { Department } from '~hospital-management/models/department';
import { CreateDepartmentDto } from '~hospital-management/public-contracts/dtos/create-department.dto';
import { DepartmentDto } from '~hospital-management/public-contracts/dtos/department.dto';
import { GetAllDepartmentsQuery } from '~hospital-management/queries/impl/departments/get-all-departments.query';
import { AuthenticatedContext } from '~utils/context/authenticated-context';
import { Result } from '~utils/result/result';

@Injectable()
export class DepartmentService {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {
    }

    async createDepartment(context: AuthenticatedContext, payload: CreateDepartmentDto): Promise<DepartmentDto> {

        const command = new CreateDepartmentCommand( { context, payload } );
        const result: Result<Department> = await this.commandBus.execute( command );

        if( result.isFailed ) {
            throw new BadRequestException( result.errors );
        }

        return modelToDepartmentDto( result.value! );
    }

    async getAllDepartments(context: AuthenticatedContext): Promise<DepartmentDto[]> {

        const query = new GetAllDepartmentsQuery( { context, params: null } );
        const result: Result<Department[]> = await this.queryBus.execute( query );

        if( result.isFailed ) {
            throw new BadRequestException( result.errors );
        }

        return modelListToDepartmentDtoList( result.value! );
    }
}
