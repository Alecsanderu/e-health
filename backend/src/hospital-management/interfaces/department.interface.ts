import { Doctor } from '~hospital-management/models/doctor';
import { Patient } from '~hospital-management/models/patient';

export interface IDepartment {
    readonly id?: string | null;
    readonly createdAt?: Date;
    readonly updatedAt?: Date | null;
    readonly name: string;
    readonly capacity: number;
    readonly doctors?: Doctor[];
    readonly patients?: Patient[];
    readonly userId: string;
}
