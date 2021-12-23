import {isEmpty, isNil} from 'lodash-es';

export function valueIsEmpty(value: Object | string | number | null | undefined): value is null | undefined {

  if (typeof value === 'number') {
    return isNil(value);
  }

  if (value instanceof Date) {
    return false;
  }

  return isNil(value) || isEmpty(value);
}
