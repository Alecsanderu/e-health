import { GenderEnum } from '~hospital-management/public-contracts/enums/gender.enum';

export class PatientDto {
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
    readonly fullName: string;
    readonly address: string;
    readonly contact: string;
    readonly emergencyContact: string | null;
    readonly dob: Date;
    readonly gender: GenderEnum;
    readonly diagnostic: string;
    readonly checkInDate: Date | null;
    readonly checkOutDate: Date | null;
}
