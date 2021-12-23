import { IException } from '~utils/exceptions/exception.interface';

export function isException(data: any): data is IException {
    return 'message' in data && 'field' in data && 'name' in data;
}

export function isExceptionList(data: any): data is IException[] {

    if( !Array.isArray( data ) ) {
        return false;
    }

    if( data.length === 0 ) {
        return true;
    }

    return data.reduce( (accumulator, currentValue) => accumulator && isException( currentValue ), true );
}
