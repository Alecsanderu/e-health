import { randomUUID } from 'crypto';
import { DepartmentEntity } from '~hospital-management/entities/department.entity';
import { IDepartment } from '~hospital-management/interfaces/department.interface';
import { Doctor } from '~hospital-management/models/doctor';
import { Patient } from '~hospital-management/models/patient';
import { CreateDepartmentDto } from '~hospital-management/public-contracts/dtos/create-department.dto';
import { entityFactory } from '~utils/entity/entity-factory.function';
import { IDomainModel } from '~utils/generics/interfaces/domain-model.interface';
import { Result } from '~utils/result/result';
import { Failed, Ok } from '~utils/result/result.functions';
import { ValidationChain } from '~utils/validation/validation-chain';

export class Department implements IDomainModel<DepartmentEntity> {

    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    name: string;
    capacity: number;
    doctors: Doctor[];
    patients: Patient[];
    userId: string;
    isDirty: boolean;

    private constructor(data: IDepartment, isDirty: boolean) {
        this.id = data.id ?? randomUUID();
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? null;
        this.name = data.name;
        this.capacity = data.capacity;
        this.doctors = data.doctors ?? [];
        this.patients = data.patients ?? [];
        this.userId = data.userId;
        this.isDirty = isDirty;
    }

    static create(data: CreateDepartmentDto, userId: string): Result<Department> {

        const validation = ValidationChain.validate<typeof data>()
                                          .hasMinimumLength( data.name, 2, 'name' )
                                          .isGreaterThan( data.capacity, 0, 'capacity' )
                                          .getResult();

        if( validation.isFailed ) {
            return Failed( ...validation.errors );
        }

        return Ok( new Department( { ...data, userId }, false ) );
    }

    static loadFromDb(data: DepartmentEntity): Department {
        return new Department( {
                                   id       : data.id,
                                   createdAt: data.created_at,
                                   updatedAt: data.updated_at,
                                   name     : data.name,
                                   capacity : data.capacity,
                                   doctors  : data.doctors?.map( d => Doctor.loadFromDb( d ) ),
                                   patients : data.patients?.map( p => Patient.loadFromDb( p ) ),
                                   userId   : data.user_id,
                               }, false );
    }

    toEntity(): DepartmentEntity {
        return entityFactory( DepartmentEntity, {
            id        : this.id,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            name      : this.name,
            capacity  : this.capacity,
            doctors   : this.doctors.map( d => d.toEntity() ),
            patients  : this.patients.map( p => p.toEntity() ),
            user_id   : this.userId,
        } );
    }
}
