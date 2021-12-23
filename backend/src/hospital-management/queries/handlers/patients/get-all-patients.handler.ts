import { QueryHandler } from '@nestjs/cqrs';
import { Patient } from '~hospital-management/models/patient';
import { GetAllPatientsQuery } from '~hospital-management/queries/impl/patients/get-all-patients.query';
import { PatientRepository } from '~hospital-management/repositories/patient.repository';
import { IException } from '~utils/exceptions/exception.interface';
import { BaseQueryHandler } from '~utils/generics/models/base-query-handler';
import { Result } from '~utils/result/result';
import { Failed, Ok } from '~utils/result/result.functions';

@QueryHandler( GetAllPatientsQuery )
export class GetAllPatientsHandler extends BaseQueryHandler<GetAllPatientsQuery> {

    constructor(
        private readonly patientRepository: PatientRepository,
    ) {
        super();
    }

    async execute(query: GetAllPatientsQuery): Promise<Result<Patient[]>> {
        const patients = await this.getAllPatientsByUserId( query.data.context.user.id );
        return this.queryResult( query, patients );
    }

    protected failedQuery(query: GetAllPatientsQuery, ...errors: IException[]): Result<any> {
        return Failed( ...errors );
    }

    protected queryResult(query: GetAllPatientsQuery, patients: Patient[]): Result<Patient[]> {
        return Ok( patients );
    }

    private async getAllPatientsByUserId(userId: string): Promise<Patient[]> {
        return await this.patientRepository.selectAllByUserId( userId );
    }
}
