import { DoctorDto } from './doctor.dto';
import { PatientDto } from './patient.dto';

export interface DepartmentDto {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  name: string;
  capacity: number;
  patients: PatientDto[];
  doctors: DoctorDto[];
}
