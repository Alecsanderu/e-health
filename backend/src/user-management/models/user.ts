import { randomUUID } from 'crypto';
import { UserEntity } from '~user-management/entities/user.entity';
import { IUser } from '~user-management/interfaces/user/user.interface';
import { RegisterUserDto } from '~user-management/public-contracts/dtos/auth/register-user.dto';
import { entityFactory } from '~utils/entity/entity-factory.function';
import { hashPassword } from '~utils/functions/password.functions';
import { IDomainModel } from '~utils/generics/interfaces/domain-model.interface';
import { Result } from '~utils/result/result';
import { Failed, Ok } from '~utils/result/result.functions';
import { ValidationChain } from '~utils/validation/validation-chain';

export class User implements IDomainModel<UserEntity> {

    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    email: string;
    phone: string;
    name: string;
    address: string;
    password: string;
    isDirty: boolean;

    private constructor(data: IUser, isDirty: boolean) {
        this.id = data.id ?? randomUUID();
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? null;
        this.email = data.email;
        this.phone = data.phone;
        this.name = data.name;
        this.address = data.address;
        this.password = data.password;
        this.isDirty = isDirty;
    }

    static create(data: RegisterUserDto): Result<User> {

        const validation = ValidationChain.validate<typeof data>()
                                          .isEmail( data.email, 'email' )
                                          .isPhone( data.phone, 'phone', 'ro-RO' )
                                          .hasMinimumLength( data.password, 6, 'password' )
                                          .hasMaximumLength( data.password, 32, 'password' )
                                          .hasMinimumLength( data.name, 4, 'name' )
                                          .hasMinimumLength( data.address, 10, 'address' )
                                          .getResult();

        if( validation.isFailed ) {
            return Failed( ...validation.errors );
        }

        return Ok( new User( { ...data, password: hashPassword( data.password ) }, false ) );
    }

    static loadFromDb(data: UserEntity): User {
        return new User( {
                             id       : data.id,
                             createdAt: data.created_at,
                             updatedAt: data.updated_at,
                             email    : data.email,
                             phone    : data.phone,
                             name     : data.name,
                             address  : data.address,
                             password : data.password,
                         }, false );
    }

    toEntity(): UserEntity {
        return entityFactory( UserEntity, {
            id        : this.id,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            email     : this.email,
            phone     : this.phone,
            name      : this.name,
            address   : this.address,
            password  : this.password,
        } );
    }
}
