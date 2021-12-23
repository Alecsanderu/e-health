import * as dayjs from 'dayjs';
import { valueIsEmpty } from './is-empty.function';

export const dateStringFormat = 'DD-MMM-YYYY';
export const dateTimeStringFormat = dateStringFormat + ' | HH:mm';

export const dateToString = (date: string | Date | null | undefined): string => {
    if( valueIsEmpty( date ) ) {
        return '-';
    }
    return dayjs( date )
        .format( dateStringFormat );
};

export const dateTimeToString = (dateTime: string | Date | null | undefined): string => {
    if( valueIsEmpty( dateTime ) ) {
        return '-';
    }
    return dayjs( dateTime )
        .format( dateTimeStringFormat );
};
