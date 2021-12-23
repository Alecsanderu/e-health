import { DoctorDto } from '~hospital-management/public-contracts/dtos/doctor.dto';
import { PatientDto } from '~hospital-management/public-contracts/dtos/patient.dto';

export class DepartmentDto {
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
    readonly name: string;
    readonly capacity: number;
    readonly doctors: DoctorDto[];
    readonly patients: PatientDto[];
}
