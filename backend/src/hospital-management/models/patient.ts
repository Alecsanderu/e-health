import { randomUUID } from 'crypto';
import { PatientEntity } from '~hospital-management/entities/patient.entity';
import { PatientNotCheckedInException } from '~hospital-management/exceptions/patient.exceptions';
import { IPatient } from '~hospital-management/interfaces/patient.interface';
import { CreatePatientDto } from '~hospital-management/public-contracts/dtos/create-patient.dto';
import { GenderEnum } from '~hospital-management/public-contracts/enums/gender.enum';
import { entityFactory } from '~utils/entity/entity-factory.function';
import { IDomainModel } from '~utils/generics/interfaces/domain-model.interface';
import { Result } from '~utils/result/result';
import { Failed, Ok } from '~utils/result/result.functions';
import { valueIsEmpty } from '~utils/validation/is-empty.function';
import { valueIsNotEmpty } from '~utils/validation/is-not-empty.function';
import { ValidationChain } from '~utils/validation/validation-chain';

export class Patient implements IDomainModel<PatientEntity> {

    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    fullName: string;
    address: string;
    contact: string;
    emergencyContact: string | null;
    dob: Date;
    gender: GenderEnum;
    diagnostic: string;
    checkInDate: Date | null;
    checkOutDate: Date | null;
    departmentId: string;
    isDirty: boolean;

    private constructor(data: IPatient, isDirty: boolean) {
        this.id = data.id ?? randomUUID();
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? null;
        this.fullName = data.fullName;
        this.address = data.address;
        this.contact = data.contact;
        this.emergencyContact = data.emergencyContact;
        this.dob = data.dob;
        this.gender = data.gender;
        this.diagnostic = data.diagnostic;
        this.checkInDate = data.checkInDate ?? new Date();
        this.checkOutDate = data.checkOutDate;
        this.departmentId = data.departmentId;
        this.isDirty = isDirty;
    }

    static create(data: CreatePatientDto): Result<Patient> {

        const validation = ValidationChain.validate<typeof data>()
                                          .hasMinimumWords( data.fullName, 2, ' ', 'fullName' )
                                          .hasMinimumLength( data.address, 10, 'address' )
                                          .isString( data.contact, 'contact' )
                                          .isString( data.emergencyContact, 'emergencyContact', true )
                                          .isValidDate( data.dob, 'dob' )
                                          .isValidDate( data.checkOutDate, 'checkOutDate', true )
                                          .isEnum( data.gender, GenderEnum, 'gender' )
                                          .isString( data.diagnostic, 'diagnostic' )
                                          .isUUIDv4( data.departmentId, 'departmentId' )
                                          .getResult();

        if( validation.isFailed ) {
            return Failed( ...validation.errors );
        }

        return Ok( new Patient( { ...data }, false ) );
    }

    static loadFromDb(data: PatientEntity): Patient {
        return new Patient( {
                                id              : data.id,
                                createdAt       : data.created_at,
                                updatedAt       : data.updated_at,
                                fullName        : data.full_name,
                                address         : data.address,
                                contact         : data.contact,
                                emergencyContact: data.emergency_contact,
                                dob             : data.dob,
                                gender          : data.gender,
                                diagnostic      : data.diagnostic,
                                checkInDate     : data.check_in_date,
                                checkOutDate    : data.check_out_date,
                                departmentId    : data.department_id,
                            }, false );
    }

    isCheckedIn(): boolean {
        return valueIsNotEmpty( this.checkInDate ) && (
            valueIsEmpty( this.checkOutDate ) || valueIsNotEmpty( this.checkOutDate ) && this.checkOutDate > new Date()
        );
    }

    checkOut(): Result<Patient> {

        if( !this.isCheckedIn() ) {
            return Failed( new PatientNotCheckedInException() );
        }

        return Ok( new Patient( { ...this, checkOutDate: new Date() }, true ) );
    }

    toEntity(): PatientEntity {
        return entityFactory( PatientEntity, {
            id               : this.id,
            created_at       : this.createdAt,
            updated_at       : this.isDirty
                               ? new Date()
                               : this.updatedAt,
            full_name        : this.fullName,
            address          : this.address,
            contact          : this.contact,
            emergency_contact: this.emergencyContact,
            dob              : this.dob,
            gender           : this.gender,
            diagnostic       : this.diagnostic,
            check_in_date    : this.checkInDate,
            check_out_date   : this.checkOutDate,
            department_id    : this.departmentId,
        } );
    }
}
