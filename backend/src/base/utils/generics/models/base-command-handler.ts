import { ICommandHandler } from '@nestjs/cqrs';
import { IException } from '~utils/exceptions/exception.interface';
import { Result } from '~utils/result/result';

export abstract class BaseSyncCommandHandler<T> implements ICommandHandler<T> {

    abstract execute(command: T): Promise<Result<any>>;

    protected abstract failedCommand(command: T, data?: any, ...errors: IException[]): Result<any>;

    protected abstract successfulCommand(command: T, ...args: any[]): Result<any>;
}
