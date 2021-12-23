import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as AuthActions from '../../store/actions/auth.actions';
import { AppState } from '../../store/reducers';


@Injectable()
export class RequestResponseHttpInterceptor implements HttpInterceptor {

    constructor(private readonly store: Store<AppState>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if( req.headers.has( 'authorization' ) ) {
            return this.interceptResponse( req, next );
        }

        return next.handle( req );
    }

    private interceptResponse(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<HttpResponse<any>> {

        return next.handle( req )
                   .pipe(
                       tap( event => {
                           if( event instanceof HttpResponse ) {
                               // If api responds with Unauthorized or Forbidden logout user
                               if( [ 401, 403 ].includes( event.status ) ) {
                                   this.store.dispatch( AuthActions.logout() );
                               }
                           }
                       } )
                   );
    }
}
