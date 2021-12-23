export interface UserDto {
    id: string;
    email: string;
    phone: string;
    name: string;
    address: string;
    createdAt: Date;
    updatedAt: Date | null;
}

