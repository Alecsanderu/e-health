import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '~user-management/entities/user.entity';
import { User } from '~user-management/models/user';
import { Result } from '~utils/result/result';
import { NotFound, Ok } from '~utils/result/result.functions';
import { valueIsEmpty } from '~utils/validation/is-empty.function';

@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository( UserEntity )
        private readonly repository: Repository<UserEntity>,
    ) {
    }

    async save(user: User): Promise<User> {
        const result = await this.repository.save( user.toEntity() );
        return User.loadFromDb( result! );
    }

    async selectOneById(id: string): Promise<Result<User>> {
        const result = await this.repository.findOne( { where: { id } } );
        return valueIsEmpty( result )
               ? NotFound()
               : Ok( User.loadFromDb( result! ) );
    }

    async selectOneByEmail(email: string): Promise<Result<User>> {
        const result = await this.repository.findOne( { where: { email } } );
        return valueIsEmpty( result )
               ? NotFound()
               : Ok( User.loadFromDb( result! ) );
    }
}
