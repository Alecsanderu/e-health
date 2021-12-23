import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GlobalExceptionHandler {

    private readonly logger = new Logger( GlobalExceptionHandler.name );

    private handleException(e: Error): void {
        this.logger.error( 'uncaughtException', e );
    }

    private handleRejectedPromise(reason: any): void {
        this.logger.error( 'unhandledRejection', reason );
    }

    private registerExceptionHandler(): void {
        process.on( 'uncaughtException', this.handleException.bind( this ) );
        process.on( 'unhandledRejection', this.handleRejectedPromise.bind( this ) );
    }

}
