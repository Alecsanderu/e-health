import { IContext } from '~utils/context/context.interface';
import { IException } from '~utils/exceptions/exception.interface';
import { IContextJsonData } from '~utils/generics/interfaces/domain-event.interface';
import { valueIsEmpty } from '~utils/validation/is-empty.function';

export const mapContextToJson = (context: IContext<any>): IContextJsonData => {
    return valueIsEmpty( context )
           ? { userId: null }
           : { userId: context?.user?.id?.value || null };
};

export const mapErrorsToJson = (errors?: IException[]): any => {
    return valueIsEmpty( errors )
           ? null
           : errors!.map( e => (
            { ...e }
        ) );
};
