import { Attribute, Component, Input, OnChanges, OnInit, Optional, Self, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseFormField } from '../../../../config/models/base-form-field.model';
import { valueIsEmpty } from '../../../../config/functions/is-empty.function';


@Component({
  selector: 'app-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss']
})
export class DateTimeInputComponent extends BaseFormField<Date> implements OnChanges {

    @Input() keepDisabled!: boolean;

    constructor(
        @Optional() @Self() public override controlDir: NgControl,
        @Attribute( 'formControlName' ) public formControlName: string
    ) {
        super( controlDir );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ( valueIsEmpty(this.value) ) {
            return;
        }
        this.value = new Date(this.value);
    }


}
