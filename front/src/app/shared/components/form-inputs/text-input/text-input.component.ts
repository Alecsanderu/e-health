import { Attribute, Component, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseFormField } from '../../../../config/models/base-form-field.model';

@Component( {
                selector   : 'app-text-input',
                templateUrl: './text-input.component.html',
                styleUrls  : [ './text-input.component.scss' ]
            } )
export class TextInputComponent extends BaseFormField<string> {
    
    
    constructor(
        @Optional() @Self() public override controlDir: NgControl,
        @Attribute( 'formControlName' ) public formControlName: string
    ) {
        super( controlDir );
    }
    
}
