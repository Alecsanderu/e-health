import { IContext } from '~utils/context/context.interface';

interface IDomainCommandData<T> {
    readonly context: IContext<any>;
    readonly payload: T;
}

export interface IDomainCommand<T> {
    readonly data: IDomainCommandData<T>;
    readonly name: string;
}
