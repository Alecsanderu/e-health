import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CheckOutPatientCommand } from '~hospital-management/commands/impl/patients/check-out-patient.command';
import { CreatePatientCommand } from '~hospital-management/commands/impl/patients/create-patient.command';
import { modelListToPatientDtoList, modelToPatientDto } from '~hospital-management/mappers/patient.mappers';
import { Patient } from '~hospital-management/models/patient';
import { CreatePatientDto } from '~hospital-management/public-contracts/dtos/create-patient.dto';
import { PatientDto } from '~hospital-management/public-contracts/dtos/patient.dto';
import { GetAllPatientsQuery } from '~hospital-management/queries/impl/patients/get-all-patients.query';
import { AuthenticatedContext } from '~utils/context/authenticated-context';
import { Result } from '~utils/result/result';

@Injectable()
export class PatientService {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {
    }

    async createPatient(context: AuthenticatedContext, payload: CreatePatientDto): Promise<PatientDto> {

        const command = new CreatePatientCommand( { context, payload } );
        const result: Result<Patient> = await this.commandBus.execute( command );

        if( result.isFailed ) {
            throw new BadRequestException( result.errors );
        }

        return modelToPatientDto( result.value! );
    }

    async checkOutPatient(context: AuthenticatedContext, patientId: string): Promise<PatientDto> {

        const command = new CheckOutPatientCommand( { context, payload: { patientId } } );
        const result: Result<Patient> = await this.commandBus.execute( command );

        if( result.isFailed ) {
            throw new BadRequestException( result.errors );
        }

        return modelToPatientDto( result.value! );
    }

    async getAllPatients(context: AuthenticatedContext): Promise<PatientDto[]> {

        const query = new GetAllPatientsQuery( { context, params: null } );
        const result: Result<Patient[]> = await this.queryBus.execute( query );

        if( result.isFailed ) {
            throw new BadRequestException( result.errors );
        }

        return modelListToPatientDtoList( result.value! );
    }
}
