import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentEntity } from '~hospital-management/entities/department.entity';
import { Department } from '~hospital-management/models/department';
import { Result } from '~utils/result/result';
import { NotFound, Ok } from '~utils/result/result.functions';
import { valueIsEmpty } from '~utils/validation/is-empty.function';

@Injectable()
export class DepartmentRepository {

    constructor(
        @InjectRepository( DepartmentEntity )
        private readonly repository: Repository<DepartmentEntity>,
    ) {
    }

    async save(user: Department): Promise<Department> {
        const result = await this.repository.save( user.toEntity() );
        return Department.loadFromDb( result! );
    }

    async selectAllByUserId(userId: string): Promise<Department[]> {
        const departments = await this.repository.find( { where: { user_id: userId }, relations: [ 'doctors', 'patients' ] } );
        return departments.map( d => Department.loadFromDb( d ) );
    }

    async selectOneByName(name: string): Promise<Result<Department>> {
        const result = await this.repository.findOne( { where: { name } } );
        return valueIsEmpty( result )
               ? NotFound()
               : Ok( Department.loadFromDb( result! ) );
    }

    async selectOneByIdAndUserId(id: string, userId: string): Promise<Result<Department>> {
        const result = await this.repository.findOne( { where: { id, user_id: userId } } );
        return valueIsEmpty( result )
               ? NotFound()
               : Ok( Department.loadFromDb( result! ) );
    }
}
