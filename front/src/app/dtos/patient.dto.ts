import { GenderEnum } from './gender.enum';

export interface PatientDto {
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
}
