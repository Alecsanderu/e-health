import { Patient } from '~hospital-management/models/patient';
import { PatientDto } from '~hospital-management/public-contracts/dtos/patient.dto';

export const modelToPatientDto = (data: Patient): PatientDto => (
    {
        id              : data.id,
        createdAt       : data.createdAt,
        updatedAt       : data.updatedAt,
        fullName        : data.fullName,
        address         : data.address,
        contact         : data.contact,
        emergencyContact: data.emergencyContact,
        dob             : data.dob,
        gender          : data.gender,
        diagnostic      : data.diagnostic,
        checkInDate     : data.checkInDate,
        checkOutDate    : data.checkOutDate,
    }
);

export const modelListToPatientDtoList = (dataList: Patient[]): PatientDto[] => {
    return dataList.map( d => modelToPatientDto( d ) );
};
