import { ErrorDto } from './error.dto';


export interface HttpErrorResponseDto {
    statusCode: number;
    message: ErrorDto[];
    error: string;
}

