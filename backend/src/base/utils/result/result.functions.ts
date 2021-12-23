import { IException } from '~utils/exceptions/exception.interface';
import { Result } from '~utils/result/result';

export function Ok<T>(value?: T): Result<T> {
    return Result.ok( value );
}

export function Failed(...errors: IException[]): Result<any> {
    return Result.failed( ...errors );
}

export function NotFound(): Result<any> {
    return Result.notFound();
}
