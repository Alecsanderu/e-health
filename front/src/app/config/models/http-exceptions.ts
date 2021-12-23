import {defaultTo} from 'lodash-es';
import { HttpErrorResponseDto } from '../../dtos/http-error-response.dto';


export enum ErrorCodes {
  Unknown             = 'unknown',
  BadRequest          = 'badRequest',
  InternalServerError = 'internalServerError',
  Unauthorized        = 'unauthorized',
  Forbidden           = 'forbidden'
}

interface HttpError<T> {
  data: T;
}

export class BaseHttpException<T> {
  readonly data: T | null;

  constructor(data?: T) {
    this._errorCode = ErrorCodes.Unknown;
    this.data = defaultTo(data, null);
  }

  // tslint:disable-next-line:variable-name
  protected _errorCode: ErrorCodes;

  get errorCode(): ErrorCodes {
    return this._errorCode;
  }
}

export class BadRequestException extends BaseHttpException<HttpErrorResponseDto> {
  constructor(data: HttpErrorResponseDto) {
    super(data);
    this._errorCode = ErrorCodes.BadRequest;
  }
}

export class InternalServerError extends BaseHttpException<void> {
  constructor() {
    super();
    this._errorCode = ErrorCodes.InternalServerError;
  }
}

export class UnauthorizedError extends BaseHttpException<void> {
  constructor() {
    super();
    this._errorCode = ErrorCodes.Unauthorized;
  }
}

export class ForbiddenError extends BaseHttpException<void> {
  constructor() {
    super();
    this._errorCode = ErrorCodes.Unauthorized;
  }
}
