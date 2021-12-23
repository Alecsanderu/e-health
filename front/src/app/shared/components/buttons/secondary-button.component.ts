import { Component } from '@angular/core';
import { BaseButton } from '../../directives/base-button.directive';

@Component( {
                selector   : 'app-secondary-button',
                templateUrl: './button.component.html'
            } )
export class SecondaryButtonComponent extends BaseButton {

    constructor() {
        super( 'secondary' );
    }
}
