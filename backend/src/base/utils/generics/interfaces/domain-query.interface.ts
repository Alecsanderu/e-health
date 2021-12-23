import { IContext } from '../../context/context.interface';

interface IDomainQueryData<T> {
    context: IContext<any>;
    params?: T;
}

export interface IDomainQuery<T> {
    readonly data: IDomainQueryData<T>;
    readonly name: string;
}
