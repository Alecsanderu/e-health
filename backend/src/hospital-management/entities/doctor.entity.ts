import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ColType } from '~config/constants/postgres-column.enum';
import { DepartmentEntity } from '~hospital-management/entities/department.entity';
import { WeekDayEnum } from '~hospital-management/public-contracts/enums/week-day.enum';
import { WorkShiftEnum } from '~hospital-management/public-contracts/enums/work-shift.enum';
import { BaseEntity } from '~utils/entity/base.entity';
import { Virtual } from '~utils/generics/interfaces/virtual.type';

@Entity( 'doctors' )
export class DoctorEntity extends BaseEntity {

    @Column( { type: ColType.varchar, nullable: false } )
    full_name: string;

    @Column( { type: ColType.varchar, nullable: false } )
    qualification: string;

    @Column( { type: ColType.varchar, nullable: false } )
    phone: string;

    @Column( { type: ColType.enum, enum: WeekDayEnum, enumName: 'week_day_enum', array: true, nullable: false } )
    working_days: WeekDayEnum[];

    @Column( { type: ColType.enum, enum: WorkShiftEnum, enumName: 'work_shift_enum' } )
    working_hours: WorkShiftEnum;

    @Column( { type: ColType.uuid, nullable: false } )
    department_id: string;

    @ManyToOne( () => DepartmentEntity, department => department.doctors, { onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: false } )
    @JoinColumn( { name: 'department_id' } )
    department?: Virtual<DepartmentEntity>;

}
