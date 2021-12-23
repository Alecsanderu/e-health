import { defaultTo, head, isNil } from 'lodash';
import { IException } from '~utils/exceptions/exception.interface';

export class Result<T> {

    private readonly _isSuccessfully: boolean;
    private readonly _isNotFound: boolean;
    private readonly _value: T | undefined;
    private readonly _errors?: IException[];

    private constructor(data: { isSuccessfully: boolean, isNotFound?: boolean, value?: T, errors?: IException[] }) {
        const { isSuccessfully, isNotFound, value, errors } = data;

        this._isSuccessfully = isSuccessfully;
        this._isNotFound = defaultTo( isNotFound, false );
        this._value = value;
        this._errors = errors;
    }

    get isSuccessfully(): boolean {
        return this._isSuccessfully;
    }

    get isFailed(): boolean {
        return !this._isSuccessfully;
    }

    get isNotFound(): boolean {
        return this._isNotFound;
    }

    get value(): T | undefined {
        return this._value;
    }

    get errors(): IException[] {
        return this._errors || [];
    }

    public static ok<T>(value?: T): Result<T> {
        return new Result<T>( { isSuccessfully: true, value } );
    }

    public static failed<T>(...errors: IException[]) {
        return new Result( { isSuccessfully: false, errors: [ ...errors ] } );
    }

    public static notFound<T>(): Result<T> {
        return new Result<T>( { isSuccessfully: true, isNotFound: true } );
    }

    public static combineResults<T>(...results: Result<T>[]): Result<T[]> {
        let errors: IException [] = [];
        let isSuccessfully: boolean = true;
        let isNotFound: boolean = false;
        const value: any[] = [];
        results.forEach( result => {
            if( result.isFailed ) {
                isSuccessfully = false;
                errors = [ ...errors, ...result.errors ];
            }

            if( result.isNotFound ) {
                isNotFound = true;
                isSuccessfully = isSuccessfully && true;
            }

            if( result.isSuccessfully ) {
                isSuccessfully = isSuccessfully && true;
                if( result.value !== undefined ) {
                    value.push( result.value );
                }
            }
        } );

        if( !isSuccessfully ) {
            return new Result<any>( { isSuccessfully, errors } );
        }

        if( isNotFound ) {
            return new Result<any>( { isSuccessfully, isNotFound } );
        }

        return new Result<any>( { isSuccessfully, value } );
    }

    public static combineValues<T>(...results: { [key in keyof T]?: Result<T[key]> | T[key] }[]): Result<T> {
        let errors: IException [] = [];
        let isSuccessfully: boolean = true;
        let isNotFound: boolean = false;
        const value: any = {};

        results.forEach( result => {
            const propertyName = this.getPropertyName( result );

            if( isNil( propertyName ) ) {
                return;
            }

            // @ts-ignore
            const propertyResult = result[propertyName!];

            if( propertyResult instanceof Result ) {
                if( propertyResult.isFailed ) {
                    errors = [ ...errors, ...propertyResult.errors ];
                    isSuccessfully = false;
                }

                if( propertyResult.isNotFound ) {
                    isNotFound = true;
                    isSuccessfully = isSuccessfully && true;
                }

                if( propertyResult.isSuccessfully ) {
                    value[propertyName!] = propertyResult.value;
                    isSuccessfully = isSuccessfully && true;
                }
            } else {
                value[propertyName!] = propertyResult;
            }
        } );

        if( !isSuccessfully ) {
            return new Result<T>( { isSuccessfully, errors } );
        }

        if( isNotFound ) {
            return new Result<T>( { isSuccessfully, isNotFound } );
        }

        return new Result<T>( { isSuccessfully, value } );

    }

    private static getPropertyName<T>(result: { [key in keyof T]?: Result<T[key]> | T[key] }): string | undefined {
        return head( Object.keys( result ) );
    }
}
