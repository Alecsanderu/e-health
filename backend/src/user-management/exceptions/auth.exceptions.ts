import { BaseException } from '~utils/exceptions/base-exception';

export class InvalidCredentialsException extends BaseException {
    name = 'invalid_credentials_exception';
    message = 'Invalid credentials';
}
