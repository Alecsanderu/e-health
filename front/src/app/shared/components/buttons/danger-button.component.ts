import { Component } from '@angular/core';
import { BaseButton } from '../../directives/base-button.directive';


@Component( {
                selector   : 'app-danger-button',
                templateUrl: './button.component.html'
            } )
export class DangerButtonComponent extends BaseButton {

    constructor() {
        super( 'danger' );
    }
}
