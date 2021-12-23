import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientEntity } from '~hospital-management/entities/patient.entity';
import { Patient } from '~hospital-management/models/patient';
import { Result } from '~utils/result/result';
import { NotFound, Ok } from '~utils/result/result.functions';
import { valueIsEmpty } from '~utils/validation/is-empty.function';

@Injectable()
export class PatientRepository {

    constructor(
        @InjectRepository( PatientEntity )
        private readonly repository: Repository<PatientEntity>,
    ) {
    }

    async save(user: Patient): Promise<Patient> {
        const result = await this.repository.save( user.toEntity() );
        return Patient.loadFromDb( result! );
    }

    async selectAllByUserId(userId: string): Promise<Patient[]> {
        const patients = await this.repository.createQueryBuilder( 'patient' )
                                   .leftJoinAndSelect( 'patient.department', 'department' )
                                   .leftJoinAndSelect( 'department.user', 'user' )
                                   .where( 'user.id = :userId', { userId } )
                                   .getMany();

        return patients.map( d => Patient.loadFromDb( d ) );
    }

    async selectOneByIdAndUserId(id: string, userId: string): Promise<Result<Patient>> {
        const patient = await this.repository.createQueryBuilder( 'patient' )
                                  .leftJoinAndSelect( 'patient.department', 'department' )
                                  .leftJoinAndSelect( 'department.user', 'user' )
                                  .where( 'user.id = :userId', { userId } )
                                  .andWhere( 'patient.id = :patientId', { patientId: id } )
                                  .getOne();

        return valueIsEmpty( patient )
               ? NotFound()
               : Ok( Patient.loadFromDb( patient! ) );
    }
}
