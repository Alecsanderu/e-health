import { ErrorCode, IException } from './exception.interface';

export class BaseException implements IException {

    field: string | null;
    message: string;
    name: ErrorCode;

    constructor(field?: string) {
        this.field = field ?? null;
    }

    static fromMessage(message: string, name = 'unknown'): BaseException {

        const exception = new BaseException();
        exception.message = message;
        exception.name = name;

        return exception;
    }
}
