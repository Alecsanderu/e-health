import { Validator } from 'class-validator';
import * as dayjs from 'dayjs';
import { defaultTo, isFunction, isNaN, isNil } from 'lodash';
import { IException } from '~utils/exceptions/exception.interface';
import { mergeArray } from '~utils/functions/merge-array.function';
import { Result } from '~utils/result/result';
import { valueIsEmpty } from '~utils/validation/is-empty.function';

export type ValidationErrorHandler = (...error: IException[]) => void;

export class ValidationChain<T> {

    private _result: Result<any>;
    private _validator: Validator;

    private constructor() {
        this._result = Result.ok();
        this._validator = new Validator();
    }

    static validate<T>() {
        return new ValidationChain<T>();
    }

    isNotEmpty(value: any, propertyName: Partial<keyof T>, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        let isEmpty: boolean = false;

        if( value instanceof Date ) {
            return this.ok();
        }

        if( typeof value === 'boolean' ) {
            isEmpty = isNil( value );
        } else if( typeof value === 'number' ) {
            isEmpty = (
                value === null || value === undefined
            );
        } else if( typeof value === 'string' ) {
            value = value.trim();
            isEmpty = (
                value === 'null' || value === 'undefined' || valueIsEmpty( value )
            );
        } else {
            isEmpty = valueIsEmpty( value );
        }

        if( isEmpty ) {
            return this.fail( propertyName, 'IsNotEmpty', customErr || `${ propertyName } is empty`, cb );
        }

        return this.ok();
    }

    isNotNull(value: any, propertyName: Partial<keyof T>, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {
        if( isNil( value ) ) {
            return this.fail( propertyName, 'IsNotNull', customErr || `${ propertyName } is null or undefined`, cb );
        }


        return this.ok();
    }

    isLessThan(value: number, reference: number, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        if( isNil( value ) && isOptional ) {
            return this.ok();
        }

        if( isNil( value ) || isNil( reference ) || isNaN( value ) || Number( value ) >= reference ) {
            return this.fail( propertyName, 'IsLessThan', customErr || `${ propertyName } is not less than ${ reference }`, cb );
        }

        return this.ok();
    }

    isEqualOrLessThan(value: number, reference: number, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        if( isNil( value ) && isOptional ) {
            return this.ok();
        }

        if( isNil( value ) || isNil( reference ) || isNaN( value ) || Number( value ) > reference ) {
            return this.fail( propertyName,
                              'IsEqualOrLessThan',
                              customErr || `${ propertyName } is not equal or less than ${ reference }`,
                              cb );
        }

        return this.ok();
    }

    isBetween(value: number, start: number, end: number, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || isNil( start ) || isNil( end ) || isNaN( value ) || Number( value ) < start || Number( value ) > end ) {
            return this.fail( propertyName, 'IsBetween', customErr || `${ propertyName } is not between ${ start } and ${ end }`, cb );
        }

        return this.ok();
    }

    isGreaterThan(value: number | null | undefined, reference: number, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {
        const isEmpty = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || isNil( reference ) || isNaN( value ) || Number( value )! <= reference ) {
            return this.fail( propertyName, 'IsGreaterThan', customErr || `${ propertyName } is not greater than ${ reference }`, cb );
        }

        return this.ok();
    }

    isEqualOrGreaterThan(value: number | null | undefined, reference: number, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || isNil( reference ) || isNaN( value ) || Number( value )! < reference ) {
            return this.fail( propertyName,
                              'IsEqualOrGreaterThan',
                              customErr || `${ propertyName } is not equal or greater than ${ reference }`,
                              cb );
        }

        return this.ok();
    }

    hasMinimumWords(value: string, reference: number, separator: string, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        value = defaultTo( value, '' );
        const totalWords = value.trim()
                                .split( separator ).length;

        if( totalWords < reference ) {
            return this.fail( propertyName, 'HasMinNWords', customErr || `${ propertyName } has less than ${ reference } words`, cb );
        }

        return this.ok();
    }

    isNotEqualTo(value: any, reference: any, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( this.areEqual( value, reference ) ) {
            return this.fail( propertyName, 'IsNotEqualTo', customErr || `${ propertyName } is equal to ${ reference }`, cb );
        }

        return this.ok();
    }

    isEqualTo(value: any, reference: any, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( !this.areEqual( value, reference ) ) {
            return this.fail( propertyName, 'IsEqualTo', customErr || `${ propertyName } is not equal to ${ reference }`, cb );
        }

        return this.ok();
    }

    hasMinimumLength(value: string | null | undefined, reference: number, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        const len = valueIsEmpty( value )
                    ? 0
                    : value!.trim().length;

        if( isNil( reference ) || len < reference ) {

            return this.fail( propertyName,
                              'HasMinimumLength',
                              customErr || `${ propertyName } has a length less than ${ reference }`,
                              cb );
        }

        return this.ok();
    }

    hasMaximumLength(value: string, reference: number, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        const len = valueIsEmpty( value )
                    ? 0
                    : value.trim().length;

        if( isNil( reference ) || len > reference ) {

            return this.fail( propertyName,
                              'HasMaximumLength',
                              customErr || `${ propertyName } has a length greater than ${ reference }`,
                              cb );

        }

        return this.ok();
    }

    hasLengthEqualTo(value: string, reference: number, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        const len = valueIsEmpty( value )
                    ? 0
                    : value.trim().length;

        if( isNil( reference ) || len !== reference ) {

            return this.fail( propertyName,
                              'HasLengthEqualTo',
                              customErr || `${ propertyName } has a length different than ${ reference }`,
                              cb );

        }

        return this.ok();
    }

    isEmail(value: string | null | undefined, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {
        const isEmpty: boolean = valueIsEmpty( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || !this._validator.isEmail( value ) ) {

            return this.fail( propertyName, 'IsEmail', customErr || `${ propertyName } is not a valid email`, cb );
        }

        return this.ok();
    }

    isEmailOrPhone(value: string, propertyName: Partial<keyof T>, locale: ValidatorJS.MobilePhoneLocale, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {
        const isEmpty: boolean = valueIsEmpty( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        const isEmailOrPhone = this._validator.isEmail( value ) || this._validator.isMobilePhone( value, locale );

        if( isEmpty || !isEmailOrPhone ) {

            return this.fail( propertyName, 'IsEmailOrPhone', customErr || `${ propertyName } is not a valid email or phone`, cb );
        }

        return this.ok();
    }

    isInteger(value: any, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty: boolean = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || !this._validator.isInt( value ) ) {

            return this.fail( propertyName, 'IsInteger', customErr || `${ propertyName } is not an integer`, cb );
        }

        return this.ok();
    }

    isTrue(value: boolean, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty: boolean = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || value !== true ) {

            return this.fail( propertyName, 'IsTrue', customErr || `${ propertyName } is not true`, cb );
        }

        return this.ok();
    }

    isFalse(value: boolean, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty: boolean = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || value !== false ) {

            return this.fail( propertyName, 'IsFalse', customErr || `${ propertyName } is not false`, cb );

        }

        return this.ok();
    }

    isSuccessfully(value: Result<any>, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException | IException[], cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty: boolean = valueIsEmpty( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty ) {

            return this.fail( propertyName, 'IsSuccessfully', customErr || `${ propertyName } is undefined`, cb );
        }

        if( value.isNotFound ) {
            return this.fail( propertyName, 'IsSuccessfully', customErr || `${ propertyName } is not found`, cb );
        }

        if( value.isFailed ) {
            return this.fail( propertyName, 'IsSuccessfully', value.errors, cb );

        }

        return this.ok();
    }

    isFailed(value: Result<any>, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty: boolean = valueIsEmpty( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || value.isSuccessfully ) {

            return this.fail( propertyName, 'IsFailed', customErr || `${ propertyName } is not failed`, cb );
        }

        return this.ok();
    }

    isNotFound(value: Result<any>, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty: boolean = valueIsEmpty( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || !value.isNotFound ) {

            return this.fail( propertyName, 'IsFailed', customErr || `${ propertyName } is not failed`, cb );
        }

        return this.ok();
    }

    /**
     * Checks if {@link Result} is different from isNotFound
     * @param value A {@link Result} value (usually obtained from a db query)
     * @param propertyName the name of the object property that is validated, it is included in error message
     * @param customErr a custom error that overrides standard error
     * @param cb a callback function to be executed after validation
     */

    isUnique(value: Result<any>, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty: boolean = valueIsEmpty( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || !value.isNotFound ) {

            return this.fail( propertyName, 'IsUnique', customErr || `${ propertyName } is not failed`, cb );
        }

        return this.ok();
    }

    isDomain(value: string, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty: boolean = valueIsEmpty( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || !this._validator.isFQDN( value ) ) {

            return this.fail( propertyName, 'IsDomain', customErr || `${ propertyName } is not a valid domain`, cb );

        }

        return this.ok();
    }

    isPhone(value: string | null | undefined, propertyName: Partial<keyof T>, locale: ValidatorJS.MobilePhoneLocale, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( !this._validator.isMobilePhone( value, locale ) ) {

            return this.fail( propertyName, 'IsPhone', customErr || `${ propertyName } is not a valid phone number`, cb );

        }

        return this.ok();
    }

    isString(value: any, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty: boolean = valueIsEmpty( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || !this._validator.isString( value ) ) {

            return this.fail( propertyName, 'IsString', customErr || `${ propertyName } is not a string`, cb );

        }

        return this.ok();
    }

    isStringList(value: any[], propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        for( const item of value ) {

            const validation = this.isString( item, propertyName, isOptional, customErr, cb )
                                   .getResult();

            if( validation.isFailed ) {
                return this.fail( propertyName, 'IsStringList', customErr || `${ propertyName } is not a string list`, cb );
            }
        }

        return this.ok();
    }

    isValidDate(value: any, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty: boolean = value === null || value === undefined;

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( !isEmpty && typeof value === 'string' && dayjs( value )
            .isValid() ) {
            return this.ok();
        }

        if( !isEmpty && typeof value === 'number' && dayjs( value )
            .isValid() ) {
            return this.ok();
        }

        if( !isEmpty && this._validator.isDate( value ) ) {
            return this.ok();
        }

        return this.fail( propertyName, 'IsValidDate', customErr || `${ propertyName } is not a valid date`, cb );
    }

    isValidDateWithFormat(value: string | null | undefined, format: string, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty: boolean = value === null || value === undefined;

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( !isEmpty && dayjs( value!, format, true )
            .isValid() ) {
            return this.ok();
        }

        return this.fail( propertyName, 'IsValidDate', customErr || `${ propertyName } is not a valid date`, cb );
    }

    isNumber(value: any, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        if( isNil( value ) && isOptional ) {
            return this.ok();
        }

        const isEmpty: boolean = isNil( value );

        if( isEmpty || !this._validator.isNumber( Number( value ) ) ) {

            return this.fail( propertyName, 'IsNumber', customErr || `${ propertyName } is not a number`, cb );

        }

        return this.ok();
    }

    isBoolean(value: any, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty: boolean = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || !this._validator.isBoolean( value ) ) {

            return this.fail( propertyName, 'IsBoolean', customErr || `${ propertyName } is not a boolean value`, cb );

        }

        return this.ok();
    }

    isUUIDv4(value: any, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        const isEmpty: boolean = isNil( value );

        if( isEmpty && isOptional ) {
            return this.ok();
        }

        if( isEmpty || !this._validator.isUUID( value, '4' ) ) {

            return this.fail( propertyName, 'IsUUIDv4', customErr || `${ propertyName } is not a uuid v4 value`, cb );

        }

        return this.ok();
    }

    isEnum(value: string | null | undefined, enumType: Object, propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {

        if( isNil( value ) && isOptional ) {
            return this.ok();
        }

        const isEmpty: boolean = valueIsEmpty( value );

        if( isEmpty || !Object.values( enumType )
                              .includes( value ) ) {

            return this.fail( propertyName, 'IsValidEnum', customErr || `${ propertyName } is not a valid enum`, cb );

        }

        return this.ok();
    }

    isOneOfEnums(value: string | null | undefined, enumTypeList: Object[], propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {
        for( const enumType of enumTypeList ) {
            const result = ValidationChain.validate<any>()
                                          .isEnum( value, enumType, propertyName, isOptional, customErr, cb )
                                          .getResult();
            if( result.isSuccessfully ) {
                return this.ok();
            }
        }

        return this.fail( propertyName, 'IsValidEnum', customErr || `${ propertyName } is not a valid enum`, cb );
    }

    isPartOfArray(value: string | number, array: (string | number)[], propertyName: Partial<keyof T>, isOptional: boolean = false, customErr?: IException, cb?: ValidationErrorHandler): ValidationChain<T> {
        if( valueIsEmpty( value ) || !array.includes( value ) ) {
            return this.fail( propertyName, 'IsPartOfArray', customErr || `${ propertyName } is not part of array`, cb );
        }

        return this.ok();
    }

    getResult(): Result<any> {
        return this._result;
    }

    private ok(): ValidationChain<T> {
        this._result = Result.combineResults( this._result, Result.ok() );
        return this;
    }

    private fail(
        propertyName: Partial<keyof T>,
        ruleName: string,
        errorMsg: string | IException | IException[],
        cb?: ValidationErrorHandler,
    ) {

        let errors: IException[] = [];

        if( typeof errorMsg === 'string' ) {

            const constraint = {};
            // @ts-ignore
            constraint[`${ propertyName }${ ruleName }`] = errorMsg;
            errors = mergeArray<IException>( errors, { name: ruleName, message: errorMsg, field: propertyName as string } );

        } else {
            errors = mergeArray<IException>( errors, errorMsg );
        }

        this._result = Result.combineResults( this._result, Result.failed( ...errors ) );

        if( isFunction( cb ) ) {
            cb( ...errors );
        }

        return this;
    }

    private areEqual(val: any, to: any, ignoreCase: boolean = true): boolean {
        val = val && typeof val === 'string' && ignoreCase
              ? val.trim()
                   .toLowerCase()
              : val;
        to = to && typeof to === 'string' && ignoreCase
             ? to.trim()
                 .toLowerCase()
             : to;
        return val === to;
    }


}
