import { modelToDoctorDto } from '~hospital-management/mappers/doctor.mappers';
import { modelToPatientDto } from '~hospital-management/mappers/patient.mappers';
import { Department } from '~hospital-management/models/department';
import { DepartmentDto } from '~hospital-management/public-contracts/dtos/department.dto';

export const modelToDepartmentDto = (data: Department): DepartmentDto => (
    {
        id       : data.id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        name     : data.name,
        capacity : data.capacity,
        doctors  : data.doctors.map( d => modelToDoctorDto( d ) ),
        patients : data.patients.map( p => modelToPatientDto( p ) ),
    }
);

export const modelListToDepartmentDtoList = (dataList: Department[]): DepartmentDto[] => {
    return dataList.map( d => modelToDepartmentDto( d ) );
};
