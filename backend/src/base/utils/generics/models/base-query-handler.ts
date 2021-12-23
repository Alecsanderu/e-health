import { IQueryHandler } from '@nestjs/cqrs';
import { IException } from '~utils/exceptions/exception.interface';
import { Result } from '~utils/result/result';

export abstract class BaseQueryHandler<T> implements IQueryHandler<T> {

    abstract execute(query: T): Promise<Result<any>>;

    protected abstract failedQuery(query: T, ...errors: IException[]): Result<any>;

    protected abstract queryResult(query: T, ...args: any[]): Result<any>;
}
