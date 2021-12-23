import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as AuthSelectors from '../../store/selectors/auth.selectors'
import { AppState } from '../../store/reducers';
import { AppR } from '../routes';


@Injectable( {
                 providedIn: 'root'
             } )
export class IsNotLoggedInGuard implements CanActivate {


    constructor(
        private readonly store: Store<AppState>,
        private readonly router: Router
    ) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store.select( AuthSelectors.isLoggedIn )
                   .pipe(
                       map( isLoggedIn => !isLoggedIn
                                               ? true
                                               : this.router.parseUrl( AppR.dashboard.from.root ) )
                   );
    }

}
