import { Column, Entity } from 'typeorm';
import { ColType } from '~config/constants/postgres-column.enum';
import { BaseEntity } from '~utils/entity/base.entity';

@Entity( 'users' )
export class UserEntity extends BaseEntity {

    @Column( { type: ColType.varchar, nullable: false, unique: true } )
    email: string;

    @Column( ColType.varchar, { nullable: false } )
    password: string;

    @Column( { type: ColType.varchar, nullable: false } )
    name: string;

    @Column( { type: ColType.varchar, nullable: false } )
    phone: string;

    @Column( { type: ColType.varchar, nullable: false } )
    address: string;
}
