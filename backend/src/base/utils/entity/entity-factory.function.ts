import { isNil } from 'lodash';

export function entityFactory<T>(entityType: new (...args: any[]) => T, data: T): T {

    if( isNil( entityType ) || isNil( data ) ) {
        throw new Error( 'Invalid arguments provided for entityFactory' );
    }

    const entity = new entityType();

    Object.keys( data )
        // @ts-ignore
          .forEach( (key: string) => entity[key] = data[key] );

    return entity;
}
