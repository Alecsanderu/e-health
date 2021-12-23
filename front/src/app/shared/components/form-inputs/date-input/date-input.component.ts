import { Attribute, Component, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseFormField } from '../../../../config/models/base-form-field.model';
import { valueIsEmpty } from '../../../../config/functions/is-empty.function';


@Component( {
              selector   : 'app-date-input',
              templateUrl: './date-input.component.html',
              styleUrls  : [ './date-input.component.scss' ]
            } )


export class DateInputComponent extends BaseFormField<Date> {

  @Input() keepDisabled!: boolean;

  constructor(
    @Optional() @Self() public override controlDir: NgControl,
    @Attribute( 'formControlName' ) public formControlName: string
  ) {
    super( controlDir );
  }
    
    override writeValue(value: Date): void {
        if( typeof value === 'string' && !valueIsEmpty( value ) ) {
            this.value = new Date( value );
            return;
        }
        this.value = value;
    }




}
