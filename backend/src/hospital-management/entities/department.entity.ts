import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ColType } from '~config/constants/postgres-column.enum';
import { DoctorEntity } from '~hospital-management/entities/doctor.entity';
import { PatientEntity } from '~hospital-management/entities/patient.entity';
import { UserEntity } from '~user-management/entities/user.entity';
import { BaseEntity } from '~utils/entity/base.entity';
import { Virtual } from '~utils/generics/interfaces/virtual.type';

@Entity( 'departments' )
export class DepartmentEntity extends BaseEntity {

    @Column( { type: ColType.varchar, nullable: false } )
    name: string;

    @Column( { type: ColType.int, nullable: false } )
    capacity: number;

    @OneToMany( () => DoctorEntity, doctor => doctor.department, { cascade: true } )
    doctors?: DoctorEntity[];

    @OneToMany( () => PatientEntity, patient => patient.department, { cascade: true } )
    patients?: PatientEntity[];

    @Column( { type: ColType.uuid, nullable: false } )
    user_id: string;

    @ManyToOne( () => UserEntity, { onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: false } )
    @JoinColumn( { name: 'user_id' } )
    user?: Virtual<UserEntity>;
}
