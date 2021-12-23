import { IException } from '../../exceptions/exception.interface';
import { IContext } from '../../context/context.interface';

export interface IDomainEventData<T> {
    context: IContext<any>;
    payload?: T;
    errors?: IException[];
}

export interface IContextJsonData {
    userId: string | null;
}

export interface IDomainEventJsonData {
    context: IContextJsonData;
    payload: any;
    name: string;
    errors: any;
}

export interface IDomainEvent<T> {
    readonly data: IDomainEventData<T>;
    readonly name: string;

    toJson(): IDomainEventJsonData;
}
