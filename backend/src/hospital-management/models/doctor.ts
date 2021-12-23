import { randomUUID } from 'crypto';
import { DoctorEntity } from '~hospital-management/entities/doctor.entity';
import { IDoctor } from '~hospital-management/interfaces/doctor.interface';
import { CreateDoctorDto } from '~hospital-management/public-contracts/dtos/create-doctor.dto';
import { WeekDayEnum } from '~hospital-management/public-contracts/enums/week-day.enum';
import { WorkShiftEnum } from '~hospital-management/public-contracts/enums/work-shift.enum';
import { entityFactory } from '~utils/entity/entity-factory.function';
import { IDomainModel } from '~utils/generics/interfaces/domain-model.interface';
import { Result } from '~utils/result/result';
import { Failed, Ok } from '~utils/result/result.functions';
import { ValidationChain } from '~utils/validation/validation-chain';

export class Doctor implements IDomainModel<DoctorEntity> {

    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    fullName: string;
    qualification: string;
    phone: string;
    workingDays: WeekDayEnum[];
    workShift: WorkShiftEnum;
    departmentId: string;
    isDirty: boolean;

    private constructor(data: IDoctor, isDirty: boolean) {
        this.id = data.id ?? randomUUID();
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? null;
        this.fullName = data.fullName;
        this.qualification = data.qualification;
        this.phone = data.phone;
        this.workingDays = data.workingDays;
        this.workShift = data.workShift;
        this.departmentId = data.departmentId;
        this.isDirty = isDirty;
    }

    static create(data: CreateDoctorDto): Result<Doctor> {

        const validation = ValidationChain.validate<typeof data>()
                                          .hasMinimumWords( data.fullName, 2, ' ', 'fullName' )
                                          .hasMinimumLength( data.qualification, 4, 'qualification' )
                                          .isPhone( data.phone, 'phone', 'ro-RO' )
                                          .isEnum( data.workShift, WorkShiftEnum, 'workShift' )
                                          .isUUIDv4( data.departmentId, 'departmentId' )
                                          .getResult();

        if( validation.isFailed ) {
            return Failed( ...validation.errors );
        }

        return Ok( new Doctor( { ...data }, false ) );
    }

    static loadFromDb(data: DoctorEntity): Doctor {
        return new Doctor( {
                               id           : data.id,
                               createdAt    : data.created_at,
                               updatedAt    : data.updated_at,
                               fullName     : data.full_name,
                               qualification: data.qualification,
                               phone        : data.phone,
                               workShift    : data.working_hours,
                               workingDays  : data.working_days,
                               departmentId : data.department_id,
                           }, false );
    }

    toEntity(): DoctorEntity {
        return entityFactory( DoctorEntity, {
            id           : this.id,
            created_at   : this.createdAt,
            updated_at   : this.updatedAt,
            full_name    : this.fullName,
            qualification: this.qualification,
            phone        : this.phone,
            working_days : this.workingDays,
            working_hours: this.workShift,
            department_id: this.departmentId,
        } );
    }
}
