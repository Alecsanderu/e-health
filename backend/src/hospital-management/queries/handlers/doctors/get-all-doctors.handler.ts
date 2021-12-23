import { QueryHandler } from '@nestjs/cqrs';
import { Doctor } from '~hospital-management/models/doctor';
import { GetAllDoctorsQuery } from '~hospital-management/queries/impl/doctors/get-all-doctors.query';
import { DoctorRepository } from '~hospital-management/repositories/doctor.repository';
import { IException } from '~utils/exceptions/exception.interface';
import { BaseQueryHandler } from '~utils/generics/models/base-query-handler';
import { Result } from '~utils/result/result';
import { Failed, Ok } from '~utils/result/result.functions';

@QueryHandler( GetAllDoctorsQuery )
export class GetAllDoctorsHandler extends BaseQueryHandler<GetAllDoctorsQuery> {

    constructor(
        private readonly doctorRepository: DoctorRepository,
    ) {
        super();
    }

    async execute(query: GetAllDoctorsQuery): Promise<Result<Doctor[]>> {
        const doctors = await this.getAllDoctorsByUserId( query.data.context.user.id );
        return this.queryResult( query, doctors );
    }

    protected failedQuery(query: GetAllDoctorsQuery, ...errors: IException[]): Result<any> {
        return Failed( ...errors );
    }

    protected queryResult(query: GetAllDoctorsQuery, doctors: Doctor[]): Result<Doctor[]> {
        return Ok( doctors );
    }

    private async getAllDoctorsByUserId(userId: string): Promise<Doctor[]> {
        return await this.doctorRepository.selectAllByUserId( userId );
    }
}
