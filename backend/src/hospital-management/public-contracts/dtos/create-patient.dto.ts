import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '~hospital-management/public-contracts/enums/gender.enum';

export class CreatePatientDto {
    @ApiProperty()
    fullName: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    contact: string;
    @ApiProperty()
    emergencyContact: string | null;
    @ApiProperty()
    dob: Date;
    @ApiProperty()
    gender: GenderEnum;
    @ApiProperty()
    diagnostic: string;
    @ApiProperty()
    checkOutDate: Date | null;
    @ApiProperty()
    departmentId: string;
}
