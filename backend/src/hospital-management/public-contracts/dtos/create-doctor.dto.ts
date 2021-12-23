import { ApiProperty } from '@nestjs/swagger';
import { WeekDayEnum } from '~hospital-management/public-contracts/enums/week-day.enum';
import { WorkShiftEnum } from '~hospital-management/public-contracts/enums/work-shift.enum';

export class CreateDoctorDto {
    @ApiProperty()
    fullName: string;
    @ApiProperty()
    qualification: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    workingDays: WeekDayEnum[];
    @ApiProperty()
    workShift: WorkShiftEnum;
    @ApiProperty()
    departmentId: string;
}
