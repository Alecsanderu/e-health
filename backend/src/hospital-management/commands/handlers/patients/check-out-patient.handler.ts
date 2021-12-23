import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { CheckOutPatientCommand } from '~hospital-management/commands/impl/patients/check-out-patient.command';
import { FailedToCheckOutPatientEvent } from '~hospital-management/events/impl/patients/failed-to-check-out-patient.event';
import { PatientCheckedOutEvent } from '~hospital-management/events/impl/patients/patient-checked-out.event';
import { PatientNotFoundException } from '~hospital-management/exceptions/patient.exceptions';
import { Patient } from '~hospital-management/models/patient';
import { PatientRepository } from '~hospital-management/repositories/patient.repository';
import { IException } from '~utils/exceptions/exception.interface';
import { BaseSyncCommandHandler } from '~utils/generics/models/base-command-handler';
import { Result } from '~utils/result/result';
import { Failed, Ok } from '~utils/result/result.functions';
import { ValidationChain } from '~utils/validation/validation-chain';

@CommandHandler( CheckOutPatientCommand )
export class CheckOutPatientHandler extends BaseSyncCommandHandler<CheckOutPatientCommand> {

    private readonly logger = new Logger( CheckOutPatientHandler.name );

    constructor(
        private readonly eventBus: EventBus,
        private readonly patientRepository: PatientRepository,
    ) {
        super();
    }

    async execute(command: CheckOutPatientCommand): Promise<Result<Patient>> {

        const { payload, context } = command.data;

        const patient = await this.getPatientByIdAndUserId( payload.patientId, context.user.id );

        if( patient.isFailed ) {
            return this.failedCommand( command, ...patient.errors );
        }

        const checkedOutPatient = patient.value!.checkOut();

        if( checkedOutPatient.isFailed ) {
            return this.failedCommand( command, ...checkedOutPatient.errors );
        }

        const savedPatient = await this.patientRepository.save( checkedOutPatient.value! );

        return this.successfulCommand( command, savedPatient );

    }

    protected failedCommand(command: CheckOutPatientCommand, ...errors: IException[]): Result<any> {
        const failedEvent = new FailedToCheckOutPatientEvent( { context: command.data.context, errors } );
        this.eventBus.publish( failedEvent );
        return Failed( ...errors );
    }

    protected successfulCommand(command: CheckOutPatientCommand, patient: Patient): Result<Patient> {
        const successEvent = new PatientCheckedOutEvent( { context: command.data.context, payload: patient } );
        this.eventBus.publish( successEvent );
        this.logger.log( `Patient '${ patient.fullName }' checked out successfully` );
        return Ok( patient );
    }

    private async getPatientByIdAndUserId(patientId: string, userId: string): Promise<Result<Patient>> {

        const validation = ValidationChain.validate<any>()
                                          .isUUIDv4( patientId, 'patientId' )
                                          .isUUIDv4( userId, 'userId' )
                                          .getResult();

        if( validation.isFailed ) {
            return Failed( ...validation.errors );
        }

        const patient = await this.patientRepository.selectOneByIdAndUserId( patientId, userId );

        if( patient.isNotFound ) {
            return Failed( new PatientNotFoundException() );
        }

        return Ok( patient.value! );
    }
}
