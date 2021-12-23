import { BaseException } from '~utils/exceptions/base-exception';

export class PatientNotFoundException extends BaseException {
    name = 'patient_not_found_exception';
    message = 'Patient not found';
}

export class PatientNotCheckedInException extends BaseException {
    name = 'patient_not_checked_in_exception';
    message = 'Patient is not checked in';
}
