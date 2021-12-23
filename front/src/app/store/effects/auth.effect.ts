import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppR } from '../../config/routes';
import { AuthService } from '../../config/services/auth.service';
import * as AuthActions from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

  login$ = createEffect( () => {
    return this.actions$.pipe(
      ofType( AuthActions.login ),
      concatMap( ({ credentials }) =>
                   this.authService.login( credentials )
                       .pipe(
                         map( data => AuthActions.userLogInSuccess( { data } ) ),
                         tap( (data) => {
                           this.router.navigateByUrl( AppR.dashboard.from.root );
                         } ),
                         catchError( error => of( AuthActions.userLogInFailed( { error } ) ) ) ),
      ),
    );
  } );


  register$ = createEffect( () => {
    return this.actions$.pipe(
      ofType( AuthActions.registerUser ),
      concatMap( ({ credentials }) =>
                   this.authService.register( credentials )
                       .pipe(
                         map( data => AuthActions.registeredUserSuccess( { data } ) ),
                         tap( () => this.router.navigateByUrl( AppR.login.from.root ) ),
                         catchError( error => of( AuthActions.failedToRegisterUser( { error } ) ) ) ),
      ),
    );
  } );

  logout$ = createEffect( () => {
    return this.actions$.pipe(
      ofType( AuthActions.logout ),
      concatMap( async () => {
                   await this.router.navigate( [ AppR.login.from.root ] );
                 },
      ),
    );
  }, { dispatch: false } );


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private readonly router: Router,
  ) {
  }

}
