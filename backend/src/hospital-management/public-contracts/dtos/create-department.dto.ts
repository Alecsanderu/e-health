import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    capacity: number;
}
