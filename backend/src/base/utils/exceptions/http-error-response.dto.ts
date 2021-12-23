import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    message: string;
    @ApiProperty()
    field?: string | null;
}

export class HttpErrorResponseDto {
    @ApiProperty()
    statusCode: number;
    @ApiProperty( { isArray: true } )
    message: ErrorDto[];
    @ApiProperty()
    error: string;
}
