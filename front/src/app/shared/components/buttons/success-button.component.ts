import { Component } from '@angular/core';
import { BaseButton } from '../../directives/base-button.directive';

@Component( {
                selector   : 'app-success-button',
                templateUrl: './button.component.html'
            } )
export class SuccessButtonComponent extends BaseButton {

    constructor() {
        super( 'success' );
    }
}
