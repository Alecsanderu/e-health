import { WeekDayEnum } from '~hospital-management/public-contracts/enums/week-day.enum';
import { WorkShiftEnum } from '~hospital-management/public-contracts/enums/work-shift.enum';

export interface IDoctor {
    readonly id?: string | null;
    readonly createdAt?: Date;
    readonly updatedAt?: Date | null;
    readonly fullName: string;
    readonly qualification: string;
    readonly phone: string;
    readonly workingDays: WeekDayEnum[];
    readonly workShift: WorkShiftEnum;
    readonly departmentId: string;
}
