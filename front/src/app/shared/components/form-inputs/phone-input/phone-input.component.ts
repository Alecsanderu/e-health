import {Attribute, Component, Optional, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import { BaseFormField } from '../../../../config/models/base-form-field.model';


@Component({
               selector   : 'app-phone-input',
               templateUrl: './phone-input.component.html',
               styleUrls  : [ './phone-input.component.scss']
           })
export class PhoneInputComponent extends BaseFormField<string> {
    
    constructor(
        @Optional() @Self() public override controlDir: NgControl,
        @Attribute('formControlName') public formControlName: string
    ) {
        super(controlDir);
    }
    
    formatPhoneNumber(value: string ): void {
        const phoneNumber = value.replace( /[\s().]+/gi, '' );
        this.onChange(phoneNumber);
    }
    
}
