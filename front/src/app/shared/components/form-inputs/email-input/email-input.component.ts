import { Attribute, Component, OnInit, Optional, Self } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';
import { BaseFormField } from '../../../../config/models/base-form-field.model';


@Component( {
                selector   : 'app-email-input',
                templateUrl: './email-input.component.html',
                styleUrls  : [ './email-input.component.scss' ]
            } )
export class EmailInputComponent extends BaseFormField<string> implements OnInit {
    
    constructor(
        @Optional() @Self() public override controlDir: NgControl,
        @Attribute( 'formControlName' ) public formControlName: string
    ) {
        super( controlDir );
    }
    
    override ngOnInit(): void {
        super.ngOnInit();
        this.setValidators( Validators.email );
    }
}
