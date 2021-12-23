import { BaseException } from '~utils/exceptions/base-exception';

export class DuplicateEmailException extends BaseException {
    name = 'duplicate_email_exception';
    message = 'Duplicate email exception';
}
