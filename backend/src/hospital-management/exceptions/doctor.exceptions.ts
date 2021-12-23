import { BaseException } from '~utils/exceptions/base-exception';

export class DuplicateDoctorNameException extends BaseException {
    name = 'duplicate_doctor_name_exception';
    message = 'Duplicate doctor name exception';
    field = 'fullName';
}
