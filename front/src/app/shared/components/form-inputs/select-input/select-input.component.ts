import { Attribute, Component, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseFormField } from '../../../../config/models/base-form-field.model';


// TODO: move it in interfaces and output for function
export interface DataForSelectMenu {
    label: string;
    value: string | boolean;
}


@Component( {
                selector   : 'app-select-input',
                templateUrl: './select-input.component.html',
                styleUrls  : [ './select-input.component.scss' ],
            } )

export class SelectInputComponent extends BaseFormField<string> implements OnInit {

    @Input() optionsToDisplay!: DataForSelectMenu[];
    @Input() keepDisabled!: boolean;

    constructor(
        @Optional() @Self() public override controlDir: NgControl,
        @Attribute( 'formControlName' ) public formControlName: string,
    ) {
        super( controlDir );
    }

    override ngOnInit(): void {
        super.ngOnInit()
    }

}
