import { Module } from '@nestjs/common';
import { GlobalExceptionFilter } from '~utils/exceptions/global-exception.filter';
import { GlobalExceptionHandler } from '~utils/exceptions/global-exception.handler';


@Module(
    {
        providers: [
            GlobalExceptionFilter,
            GlobalExceptionHandler,
        ],
        exports  : [
            GlobalExceptionFilter,
            GlobalExceptionHandler,
        ],
    },
)
export class UtilsModule {
}
