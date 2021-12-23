import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../store/actions/auth.actions';
import { AppState } from '../../../../store/reducers';

@Component( {
                selector   : 'app-navbar',
                templateUrl: './navbar.component.html',
                styleUrls  : [ './navbar.component.scss' ],
            } )
export class NavbarComponent {

    @Output() sideMenuButtonClicked: EventEmitter<void> = new EventEmitter<void>();

    constructor(private readonly store: Store<AppState>) {
    }

    onSideMenuButtonClicked(): void {
        this.sideMenuButtonClicked.emit();
    }

    logout(): void {
        this.store.dispatch( AuthActions.logout() );
    }
}
