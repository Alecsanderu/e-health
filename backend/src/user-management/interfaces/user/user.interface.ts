export interface IUser {
    readonly id?: string | null;
    readonly createdAt?: Date;
    readonly updatedAt?: Date | null;
    readonly email: string;
    readonly password: string;
    readonly phone: string;
    readonly name: string;
    readonly address: string;
}
