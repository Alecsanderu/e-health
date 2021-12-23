import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { BadRequestException, BaseHttpException, ForbiddenError, InternalServerError, UnauthorizedError } from '../models/http-exceptions';

export const httpErrorHandler = (error: HttpErrorResponse): ReturnType<typeof throwError> => {
  if( error.error instanceof ErrorEvent ) {
    console.log( 'httpRequestError', error.error.message );
    return throwError( new BaseHttpException( error.error.message ) );
  }

  if( error.status === 500 ) {
    return throwError( new InternalServerError() );
  }

  if( error.status === 400 ) {
    return throwError( new BadRequestException( error.error ) );
  }

  if( error.status === 401 ) {
    return throwError( new UnauthorizedError() );
  }

  if( error.status === 403 ) {
    return throwError( new ForbiddenError() );
  }

  return throwError( new BaseHttpException( JSON.stringify( error.error ) ) );
};
