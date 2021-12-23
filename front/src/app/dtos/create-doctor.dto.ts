export enum WeekDayEnum {
    Monday    = 'mo',
    Tuesday   = 'tu',
    Wednesday = 'we',
    Thursday  = 'th',
    Friday    = 'fr',
    Saturday  = 'sa',
    Sunday    = 'su'
}

export enum WorkShiftEnum {
    Day   = 'day',
    Night = 'night'
}


export interface CreateDoctorDto {
    fullName: string;
    qualification: string;
    phone: string;
    workingDays: WeekDayEnum[];
    workShift: WorkShiftEnum;
    departmentId: string;
}
