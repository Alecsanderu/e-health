import { Attribute, Component, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseFormField } from '../../../../config/models/base-form-field.model';

@Component( {
              selector   : 'app-textarea-input',
              templateUrl: './textarea-input.component.html',
              styleUrls  : [ './textarea-input.component.scss' ]
            } )
export class TextareaInputComponent extends BaseFormField<string> {

  constructor(
    @Optional() @Self() public override controlDir: NgControl,
    @Attribute( 'formControlName' ) public formControlName: string
  ) {
    super( controlDir );
  }

}
