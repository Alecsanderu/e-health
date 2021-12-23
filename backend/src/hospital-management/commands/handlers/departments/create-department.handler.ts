import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateDepartmentCommand } from '~hospital-management/commands/impl/departments/create-department.command';
import { DepartmentCreatedEvent } from '~hospital-management/events/impl/departments/department-created.event';
import { FailedToCreateDepartmentEvent } from '~hospital-management/events/impl/departments/failed-to-create-department.event';
import { DuplicateDepartmentNameException } from '~hospital-management/exceptions/department.exceptions';
import { Department } from '~hospital-management/models/department';
import { CreateDepartmentDto } from '~hospital-management/public-contracts/dtos/create-department.dto';
import { DepartmentRepository } from '~hospital-management/repositories/department.repository';
import { IException } from '~utils/exceptions/exception.interface';
import { BaseSyncCommandHandler } from '~utils/generics/models/base-command-handler';
import { Result } from '~utils/result/result';
import { Failed, Ok } from '~utils/result/result.functions';

@CommandHandler( CreateDepartmentCommand )
export class CreateDepartmentHandler extends BaseSyncCommandHandler<CreateDepartmentCommand> {

    private readonly logger = new Logger( CreateDepartmentHandler.name );

    constructor(
        private readonly eventBus: EventBus,
        private readonly deptRepository: DepartmentRepository,
    ) {
        super();
    }

    async execute(command: CreateDepartmentCommand): Promise<Result<Department>> {

        const { payload, context } = command.data;

        const departmentByName = await this.getDepartmentByName( payload.name );

        if( departmentByName.isFailed ) {
            return this.failedCommand( command, ...departmentByName.errors );
        }

        const department = await this.createAndSaveDepartment( payload, context.user.id );

        if( department.isFailed ) {
            return this.failedCommand( command, ...department.errors );
        }

        return this.successfulCommand( command, department.value! );

    }

    protected failedCommand(command: CreateDepartmentCommand, ...errors: IException[]): Result<any> {
        const failedEvent = new FailedToCreateDepartmentEvent( { context: command.data.context, errors } );
        this.eventBus.publish( failedEvent );
        return Failed( ...errors );
    }

    protected successfulCommand(command: CreateDepartmentCommand, dept: Department): Result<Department> {
        const successEvent = new DepartmentCreatedEvent( { context: command.data.context, payload: dept } );
        this.eventBus.publish( successEvent );
        this.logger.log( `Department created successfully: ${ dept.name }` );
        return Ok( dept );
    }

    private async getDepartmentByName(name: string): Promise<Result<Department>> {

        const dept = await this.deptRepository.selectOneByName( name );

        if( !dept.isNotFound ) {
            return Failed( new DuplicateDepartmentNameException() );
        }

        return Ok( dept.value! );
    }

    private async createAndSaveDepartment(data: CreateDepartmentDto, userId: string): Promise<Result<Department>> {

        const dept = Department.create( data, userId );

        if( dept.isFailed ) {
            return Failed( ...dept.errors );
        }

        const savedUser = await this.deptRepository.save( dept.value! );

        return Ok( savedUser );
    }
}
