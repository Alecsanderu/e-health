import { Attribute, Component, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseFormField } from '../../../../config/models/base-form-field.model';

@Component( {
              selector   : 'app-number-input',
              templateUrl: './number-input.component.html',
              styleUrls  : [ './number-input.component.scss' ],
            } )
export class NumberInputComponent extends BaseFormField<number> implements OnInit {

  @Input() suffix!: string;
  @Input() fractionalDigits!: number;
  @Input() min!: number;
  @Input() max!: number;

  constructor(
    @Optional() @Self() public override controlDir: NgControl,
    @Attribute( 'formControlName' ) public formControlName: string,
  ) {
    super( controlDir );
  }
}
