import { WeekDayEnum } from '~hospital-management/public-contracts/enums/week-day.enum';
import { WorkShiftEnum } from '~hospital-management/public-contracts/enums/work-shift.enum';

export class DoctorDto {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    fullName: string;
    qualification: string;
    phone: string;
    workingDays: WeekDayEnum[];
    workShift: WorkShiftEnum;
}
