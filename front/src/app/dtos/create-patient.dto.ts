import { GenderEnum } from './gender.enum';

export interface CreatePatientDto {
    fullName: string;
    address: string;
    contact: string;
    emergencyContact: string | null;
    dob: Date;
    gender: GenderEnum;
    diagnostic: string;
    checkOutDate: Date | null;
    departmentId: string;
}
