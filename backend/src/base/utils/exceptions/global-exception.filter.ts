import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import stringify from 'fast-safe-stringify';
import { camelCase, startCase } from 'lodash';
import { isException, isExceptionList } from '~utils/exceptions/exception.functions';
import { ErrorDto, HttpErrorResponseDto } from '~utils/exceptions/http-error-response.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger( GlobalExceptionFilter.name );

    catch(exception: unknown, host: ArgumentsHost): any {

        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();
        const method = request.method;
        const url = request.url;

        const payload: HttpErrorResponseDto = exception instanceof HttpException
                                              ? this.transformHttpException( exception )
                                              : this.transformOtherException();

        const status = payload.statusCode;

        if( exception instanceof HttpException ) {
            const data = stringify( payload.message );
            this.logger.debug( `${ method } ${ url }`, GlobalExceptionFilter.name, { status, data } );
        } else {
            this.logger.error( `${ method } ${ url }`, exception as Error, undefined, { status } );
        }

        return response.status( payload.statusCode )
                       .json( payload );

    }

    private transformHttpException(exception: HttpException): HttpErrorResponseDto {

        const statusCode = exception.getStatus();
        const originalPayload = exception.getResponse();

        if( originalPayload instanceof HttpErrorResponseDto || this.isHttpErrorResponse( originalPayload ) ) {
            return originalPayload;
        }

        const error: string = this.statusCodeToError( statusCode );
        let message: ErrorDto[];

        if( typeof originalPayload === 'string' ) {
            message = [
                {
                    name   : this.statusCodeToErrorCode( statusCode ),
                    message: originalPayload,
                    field  : null,
                },
            ];

            return { statusCode, message: message, error: error };
        }

        if( isException( originalPayload ) ) {
            message = [ originalPayload ];
            return { statusCode, message: message, error: error };
        }

        if( isExceptionList( originalPayload ) ) {
            message = [ ...originalPayload ];
            return { statusCode, message: message, error: error };
        }

        if( typeof originalPayload === 'object' && originalPayload.hasOwnProperty( 'message' ) ) {
            message = [
                {
                    name   : this.statusCodeToErrorCode( statusCode ),
                    message: (
                        originalPayload as any
                    ).message,
                    field  : null,
                },
            ];
            return { statusCode, message: message, error: error };
        }

        message = [ { name: 'unexpected', message: stringify.stable( originalPayload ), field: null } ];

        return { statusCode, message: message, error: error };

    }

    private statusCodeToError(statusCode: number) {
        return startCase( camelCase( HttpStatus[statusCode] ) );
    }

    private statusCodeToErrorCode(statusCode: number) {
        return camelCase( HttpStatus[statusCode] );
    }

    private transformOtherException(): HttpErrorResponseDto {

        const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        const error = this.statusCodeToError( statusCode );
        const message: ErrorDto[] = [
            {
                name: this.statusCodeToErrorCode( statusCode ), message: this.statusCodeToError( statusCode ), field: null,
            },
        ];

        return { statusCode, message: message, error: error };
    }

    private isHttpErrorResponse(data: any): data is HttpErrorResponseDto {
        return 'statusCode' in data && 'error' in data && 'message' in data && Array.isArray( data?.message );
    }

}
