import { QueryHandler } from '@nestjs/cqrs';
import { Department } from '~hospital-management/models/department';
import { GetAllDepartmentsQuery } from '~hospital-management/queries/impl/departments/get-all-departments.query';
import { DepartmentRepository } from '~hospital-management/repositories/department.repository';
import { IException } from '~utils/exceptions/exception.interface';
import { BaseQueryHandler } from '~utils/generics/models/base-query-handler';
import { Result } from '~utils/result/result';
import { Failed, Ok } from '~utils/result/result.functions';

@QueryHandler( GetAllDepartmentsQuery )
export class GetAllDepartmentsHandler extends BaseQueryHandler<GetAllDepartmentsQuery> {

    constructor(
        private readonly deptRepository: DepartmentRepository,
    ) {
        super();
    }

    async execute(query: GetAllDepartmentsQuery): Promise<Result<Department[]>> {
        const departments = await this.getAllDepartmentsByUserId( query.data.context.user.id );
        return this.queryResult( query, departments );
    }

    protected failedQuery(query: GetAllDepartmentsQuery, ...errors: IException[]): Result<any> {
        return Failed( ...errors );
    }

    protected queryResult(query: GetAllDepartmentsQuery, departments: Department[]): Result<Department[]> {
        return Ok( departments );
    }

    private async getAllDepartmentsByUserId(userId: string): Promise<Department[]> {
        return await this.deptRepository.selectAllByUserId( userId );
    }
}
