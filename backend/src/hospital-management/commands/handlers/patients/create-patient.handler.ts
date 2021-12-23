import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { CreatePatientCommand } from '~hospital-management/commands/impl/patients/create-patient.command';
import { FailedToCreatePatientEvent } from '~hospital-management/events/impl/patients/failed-to-create-patient.event';
import { PatientCreatedEvent } from '~hospital-management/events/impl/patients/patient-created.event';
import { DepartmentNotFoundException } from '~hospital-management/exceptions/department.exceptions';
import { Department } from '~hospital-management/models/department';
import { Patient } from '~hospital-management/models/patient';
import { CreatePatientDto } from '~hospital-management/public-contracts/dtos/create-patient.dto';
import { DepartmentRepository } from '~hospital-management/repositories/department.repository';
import { PatientRepository } from '~hospital-management/repositories/patient.repository';
import { IException } from '~utils/exceptions/exception.interface';
import { BaseSyncCommandHandler } from '~utils/generics/models/base-command-handler';
import { Result } from '~utils/result/result';
import { Failed, Ok } from '~utils/result/result.functions';
import { ValidationChain } from '~utils/validation/validation-chain';

@CommandHandler( CreatePatientCommand )
export class CreatePatientHandler extends BaseSyncCommandHandler<CreatePatientCommand> {

    private readonly logger = new Logger( CreatePatientHandler.name );

    constructor(
        private readonly eventBus: EventBus,
        private readonly patientRepository: PatientRepository,
        private readonly deptRepository: DepartmentRepository,
    ) {
        super();
    }

    async execute(command: CreatePatientCommand): Promise<Result<Patient>> {

        const { payload, context } = command.data;

        const department = await this.getDepartmentByIdAndUserId( payload.departmentId, context.user.id );

        if( department.isFailed ) {
            return this.failedCommand( command, ...department.errors );
        }

        const patient = await this.createAndSavePatient( payload );

        if( patient.isFailed ) {
            return this.failedCommand( command, ...patient.errors );
        }

        return this.successfulCommand( command, patient.value! );

    }

    protected failedCommand(command: CreatePatientCommand, ...errors: IException[]): Result<any> {
        const failedEvent = new FailedToCreatePatientEvent( { context: command.data.context, errors } );
        this.eventBus.publish( failedEvent );
        return Failed( ...errors );
    }

    protected successfulCommand(command: CreatePatientCommand, patient: Patient): Result<Patient> {
        const successEvent = new PatientCreatedEvent( { context: command.data.context, payload: patient } );
        this.eventBus.publish( successEvent );
        this.logger.log( `Patient created successfully: ${ patient.fullName }` );
        return Ok( patient );
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

    private async createAndSavePatient(data: CreatePatientDto): Promise<Result<Patient>> {

        const patient = Patient.create( data );

        if( patient.isFailed ) {
            return Failed( ...patient.errors );
        }

        const savedPatient = await this.patientRepository.save( patient.value! );

        return Ok( savedPatient );
    }
}
