import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateDoctorCommand } from '~hospital-management/commands/impl/doctors/create-doctor.command';
import { modelListToDoctorDtoList, modelToDoctorDto } from '~hospital-management/mappers/doctor.mappers';
import { Doctor } from '~hospital-management/models/doctor';
import { CreateDoctorDto } from '~hospital-management/public-contracts/dtos/create-doctor.dto';
import { DoctorDto } from '~hospital-management/public-contracts/dtos/doctor.dto';
import { GetAllDoctorsQuery } from '~hospital-management/queries/impl/doctors/get-all-doctors.query';
import { AuthenticatedContext } from '~utils/context/authenticated-context';
import { Result } from '~utils/result/result';

@Injectable()
export class DoctorService {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {
    }

    async createDoctor(context: AuthenticatedContext, payload: CreateDoctorDto): Promise<DoctorDto> {

        const command = new CreateDoctorCommand( { context, payload } );
        const result: Result<Doctor> = await this.commandBus.execute( command );

        if( result.isFailed ) {
            throw new BadRequestException( result.errors );
        }

        return modelToDoctorDto( result.value! );
    }

    async getAllDoctors(context: AuthenticatedContext): Promise<DoctorDto[]> {

        const query = new GetAllDoctorsQuery( { context, params: null } );
        const result: Result<Doctor[]> = await this.queryBus.execute( query );

        if( result.isFailed ) {
            throw new BadRequestException( result.errors );
        }

        return modelListToDoctorDtoList( result.value! );
    }
}
