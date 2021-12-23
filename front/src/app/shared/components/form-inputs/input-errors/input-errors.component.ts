import { Component, Input, OnInit } from '@angular/core';
import { isArray } from 'lodash-es';
import { valueIsEmpty } from '../../../../config/functions/is-empty.function';

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss']
})
export class InputErrorsComponent implements OnInit {
    
    @Input() errors? : string | string[];
    @Input() displayErrors?: boolean;
    
    get errorsToDisplay(): string[] {
        if ( isArray( this.errors ) ) {
            return this.errors;
        }
        
        if ( !valueIsEmpty(this.errors) ) {
            return [this.errors];
        }
        
        return [];
        
    }

  constructor() { }

  ngOnInit(): void {
  }

}
