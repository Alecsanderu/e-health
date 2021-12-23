import { BaseException } from '~utils/exceptions/base-exception';

export class DuplicateDepartmentNameException extends BaseException {
    name = 'duplicate_department_name_exception';
    message = 'Duplicate department name exception';
    field = 'name';
}

export class DepartmentNotFoundException extends BaseException {
    name = 'department_not_found_exception';
    message = 'Department not found exception';
}
