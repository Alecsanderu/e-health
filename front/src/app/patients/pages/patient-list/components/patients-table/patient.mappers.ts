import { PatientDto } from '../../../../../dtos/patient.dto';
import { IPatient } from './patient.interface';
import { dateToString } from '../../../../../config/functions/date-format.function';

export const mapPatientDtoToIPatient = ( dto: PatientDto ): IPatient => (
    {
        id: dto.id,
        fullName: dto.fullName,
        address: dto.address,
        contact: dto.contact,
        emergencyContact: dto.emergencyContact,
        dob: dateToString(dto.dob),
        gender: dto.gender,
        diagnostic: dto.diagnostic,
        checkInDate: dateToString(dto.checkInDate),
        checkOutDate: dateToString(dto.checkOutDate),
    }
)

export const mapPatientDtoListToIPatientList = ( dtos: PatientDto[] ) => dtos.map( mapPatientDtoToIPatient)
