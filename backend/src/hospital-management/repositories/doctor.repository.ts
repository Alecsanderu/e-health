import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from '~hospital-management/entities/doctor.entity';
import { Doctor } from '~hospital-management/models/doctor';
import { Result } from '~utils/result/result';
import { NotFound, Ok } from '~utils/result/result.functions';
import { valueIsEmpty } from '~utils/validation/is-empty.function';

@Injectable()
export class DoctorRepository {

    constructor(
        @InjectRepository( DoctorEntity )
        private readonly repository: Repository<DoctorEntity>,
    ) {
    }

    async save(user: Doctor): Promise<Doctor> {
        const result = await this.repository.save( user.toEntity() );
        return Doctor.loadFromDb( result! );
    }

    async selectOneByFullNameAndDepartmentId(fullName: string, departmentId: string): Promise<Result<Doctor>> {
        const result = await this.repository.findOne( { where: { full_name: fullName, department_id: departmentId } } );
        return valueIsEmpty( result )
               ? NotFound()
               : Ok( Doctor.loadFromDb( result! ) );
    }

    async selectAllByUserId(userId: string): Promise<Doctor[]> {
        const doctors = await this.repository.createQueryBuilder( 'doctor' )
                                  .leftJoinAndSelect( 'doctor.department', 'department' )
                                  .leftJoinAndSelect( 'department.user', 'user' )
                                  .where( 'user.id = :userId', { userId } )
                                  .getMany();

        return doctors.map( d => Doctor.loadFromDb( d ) );
    }
}
