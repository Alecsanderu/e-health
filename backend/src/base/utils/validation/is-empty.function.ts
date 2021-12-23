import { isEmpty, isNil } from 'lodash';

export function valueIsEmpty(value: Object | string | number | null | undefined): value is undefined | null {

    if( typeof value === 'number' ) {
        return isNil( value );
    }

    if( value instanceof Date ) {
        return false;
    }

    return isNil( value ) || isEmpty( value );
}
