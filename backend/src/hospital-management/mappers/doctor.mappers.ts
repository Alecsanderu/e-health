import { Doctor } from '~hospital-management/models/doctor';
import { DoctorDto } from '~hospital-management/public-contracts/dtos/doctor.dto';

export const modelToDoctorDto = (data: Doctor): DoctorDto => (
    {
        id           : data.id,
        createdAt    : data.createdAt,
        updatedAt    : data.updatedAt,
        fullName     : data.fullName,
        qualification: data.qualification,
        phone        : data.phone,
        workingDays  : data.workingDays,
        workShift    : data.workShift,
    }
);

export const modelListToDoctorDtoList = (dataList: Doctor[]): DoctorDto[] => {
    return dataList.map( d => modelToDoctorDto( d ) );
};
