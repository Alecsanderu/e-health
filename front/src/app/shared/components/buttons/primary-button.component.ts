import { Component } from '@angular/core';
import { BaseButton } from '../../directives/base-button.directive';


@Component( {
                selector   : 'app-primary-button',
                templateUrl: './button.component.html'
            } )
export class PrimaryButtonComponent extends BaseButton {

    constructor() {
        super( 'primary' );
    }

}
