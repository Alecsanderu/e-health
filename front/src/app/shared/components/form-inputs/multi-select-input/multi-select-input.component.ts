import { Attribute, Component, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseFormField } from '../../../../config/models/base-form-field.model';


export interface DataForSelectMenu {
    label: string;
    value: string | boolean;
}


@Component( {
                selector   : 'app-multi-select-input',
                templateUrl: './multi-select-input.component.html',
                styleUrls  : [ './multi-select-input.component.scss' ],
            } )

export class MultiSelectInputComponent extends BaseFormField<string[]> implements OnInit {

    @Input() optionsToDisplay!: DataForSelectMenu[];
    @Input() keepDisabled!: boolean;

    constructor(
        @Optional() @Self() public override controlDir: NgControl,
        @Attribute( 'formControlName' ) public formControlName: string,
    ) {
        super( controlDir );
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

}
