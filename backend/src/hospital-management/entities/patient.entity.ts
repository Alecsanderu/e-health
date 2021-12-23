import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ColType } from '~config/constants/postgres-column.enum';
import { DepartmentEntity } from '~hospital-management/entities/department.entity';
import { GenderEnum } from '~hospital-management/public-contracts/enums/gender.enum';
import { BaseEntity } from '~utils/entity/base.entity';
import { Virtual } from '~utils/generics/interfaces/virtual.type';

@Entity( 'patients' )
export class PatientEntity extends BaseEntity {

    @Column( { type: ColType.varchar, nullable: false } )
    full_name: string;

    @Column( { type: ColType.varchar, nullable: false } )
    address: string;

    @Column( { type: ColType.varchar, nullable: false } )
    contact: string;

    @Column( { type: ColType.varchar, nullable: true } )
    emergency_contact: string | null;

    @Column( { type: ColType.date, nullable: false } )
    dob: Date;

    @Column( { type: ColType.enum, enum: GenderEnum, enumName: 'gender_enum', nullable: false } )
    gender: GenderEnum;

    @Column( { type: ColType.varchar, nullable: false } )
    diagnostic: string;

    @Column( { type: ColType.date, nullable: true } )
    check_in_date: Date | null;

    @Column( { type: ColType.date, nullable: true } )
    check_out_date: Date | null;

    @Column( { type: ColType.uuid, nullable: false } )
    department_id: string;

    @ManyToOne( () => DepartmentEntity, department => department.patients, { onUpdate: 'CASCADE', onDelete: 'CASCADE' } )
    @JoinColumn( { name: 'department_id' } )
    department?: Virtual<DepartmentEntity>;

}
