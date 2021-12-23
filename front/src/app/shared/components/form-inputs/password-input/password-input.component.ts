import { Attribute, Component, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseFormField } from '../../../../config/models/base-form-field.model';


@Component( {
              selector   : 'app-password-input',
              templateUrl: './password-input.component.html',
              styleUrls  : [ './password-input.component.scss' ],
            } )
export class PasswordInputComponent extends BaseFormField<string> {

  @Input() feedback = true;

  constructor(
    @Optional() @Self() public override controlDir: NgControl,
    @Attribute( 'formControlName' ) public formControlName: string,
  ) {
    super( controlDir );
  }

}
