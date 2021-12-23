import { Component } from '@angular/core';
import { BaseButton } from '../../directives/base-button.directive';

@Component( {
                selector   : 'app-warning-button',
                templateUrl: './button.component.html'
            } )
export class WarningButtonComponent extends BaseButton {

    constructor() {
        super( 'warning' );
    }
}
