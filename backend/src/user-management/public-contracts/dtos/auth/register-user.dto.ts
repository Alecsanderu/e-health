import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    address: string;
}
