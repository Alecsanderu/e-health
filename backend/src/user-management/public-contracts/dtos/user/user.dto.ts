import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date | null;
}
