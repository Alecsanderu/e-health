import { isEmpty, isNil } from 'lodash';

export function valueIsNotEmpty<T>(value: T | null | undefined): value is T {

    if( typeof value === 'string' ) {
        return value.trim().length > 0;
    }

    return !(
        isNil( value ) && isEmpty( value )
    );
}
