import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateDoctorCommand } from '~hospital-management/commands/impl/doctors/create-doctor.command';
import { DoctorCreatedEvent } from '~hospital-management/events/impl/doctors/doctor-created.event';
import { FailedToCreateDoctorEvent } from '~hospital-management/events/impl/doctors/failed-to-create-doctor.event';
import { DepartmentNotFoundException } from '~hospital-management/exceptions/department.exceptions';
import { DuplicateDoctorNameException } from '~hospital-management/exceptions/doctor.exceptions';
import { Department } from '~hospital-management/models/department';
import { Doctor } from '~hospital-management/models/doctor';
import { CreateDoctorDto } from '~hospital-management/public-contracts/dtos/create-doctor.dto';
import { DepartmentRepository } from '~hospital-management/repositories/department.repository';
import { DoctorRepository } from '~hospital-management/repositories/doctor.repository';
import { IException } from '~utils/exceptions/exception.interface';
import { BaseSyncCommandHandler } from '~utils/generics/models/base-command-handler';
import { Result } from '~utils/result/result';
import { Failed, Ok } from '~utils/result/result.functions';
import { ValidationChain } from '~utils/validation/validation-chain';

@CommandHandler( CreateDoctorCommand )
export class CreateDoctorHandler extends BaseSyncCommandHandler<CreateDoctorCommand> {

    private readonly logger = new Logger( CreateDoctorHandler.name );

    constructor(
        private readonly eventBus: EventBus,
        private readonly doctorRepository: DoctorRepository,
        private readonly deptRepository: DepartmentRepository,
    ) {
        super();
    }

    async execute(command: CreateDoctorCommand): Promise<Result<Doctor>> {

        const { payload, context } = command.data;

        const department = await this.getDepartmentByIdAndUserId( payload.departmentId, context.user.id );

        if( department.isFailed ) {
            return this.failedCommand( command, ...department.errors );
        }

        const doctorByNameAndDeptId = await this.getDoctorByNameAndDeptId( payload.fullName, payload.departmentId );

        if( doctorByNameAndDeptId.isFailed ) {
            return this.failedCommand( command, ...doctorByNameAndDeptId.errors );
        }

        const doctor = await this.createAndSaveDoctor( payload );

        if( doctor.isFailed ) {
            return this.failedCommand( command, ...doctor.errors );
        }

        return this.successfulCommand( command, doctor.value! );

    }

    protected failedCommand(command: CreateDoctorCommand, ...errors: IException[]): Result<any> {
        const failedEvent = new FailedToCreateDoctorEvent( { context: command.data.context, errors } );
        this.eventBus.publish( failedEvent );
        return Failed( ...errors );
    }

    protected successfulCommand(command: CreateDoctorCommand, doctor: Doctor): Result<Doctor> {
        const successEvent = new DoctorCreatedEvent( { context: command.data.context, payload: doctor } );
        this.eventBus.publish( successEvent );
        this.logger.log( `Doctor created successfully: ${ doctor.fullName }` );
        return Ok( doctor );
    }

    private async getDepartmentByIdAndUserId(id: string, userId: string): Promise<Result<Department>> {

        const validation = ValidationChain.validate<any>()
                                          .isUUIDv4( id, 'departmentId' )
                                          .getResult();

        if( validation.isFailed ) {
            return Failed( ...validation.errors );
        }

        const department = await this.deptRepository.selectOneByIdAndUserId( id, userId );

        if( department.isNotFound ) {
            return Failed( new DepartmentNotFoundException() );
        }

        return Ok( department.value! );
    }

    private async getDoctorByNameAndDeptId(name: string, deptId: string): Promise<Result<Doctor>> {

        const validation = ValidationChain.validate<any>()
                                          .isString( name, 'name' )
                                          .isUUIDv4( deptId, 'deptId' )
                                          .getResult();

        if( validation.isFailed ) {
            return Failed( ...validation.errors );
        }

        const doctor = await this.doctorRepository.selectOneByFullNameAndDepartmentId( name, deptId );

        if( !doctor.isNotFound ) {
            return Failed( new DuplicateDoctorNameException() );
        }

        return Ok( doctor.value! );
    }

    private async createAndSaveDoctor(data: CreateDoctorDto): Promise<Result<Doctor>> {

        const doctor = Doctor.create( data );

        if( doctor.isFailed ) {
            return Failed( ...doctor.errors );
        }

        const savedDoctor = await this.doctorRepository.save( doctor.value! );

        return Ok( savedDoctor );
    }
}
