import { Component, Input, OnInit } from '@angular/core';
import { defaultTo } from 'lodash-es';
import { valueIsEmpty } from '../../../../config/functions/is-empty.function';
import { isDefined } from '../../../../config/functions/is-defined';


@Component( {
                selector   : 'app-input-wrapper,[app-input-wrapper]',
                templateUrl: './input-wrapper.component.html',
                styleUrls  : [ './input-wrapper.component.scss' ]
            } )
export class InputWrapperComponent implements OnInit {
    
    @Input() label?: string;
    @Input() required?: boolean;
    @Input() errors?: string | string[];
    @Input() touched!: boolean;
    @Input() valid!: boolean;
    @Input() disabled!: boolean;
    @Input() name!: string | number;
    @Input() helpText?: string;
    @Input() floatLabel: boolean = true;
    
    
    constructor() {
    }
    
    get iconClass(): 'invalid-icon' | 'valid-icon' | undefined {
        if( this.touched && this.valid ) {
            return 'valid-icon';
        }
        
        if( this.touched && !this.valid ) {
            return 'invalid-icon';
        }
        
        return;
    }
    
    get statusIcon(): 'pi pi-check' | 'pi pi-exclamation-circle' | '' {
        if( this.disabled ) {
            return '' ;
        }
        if( this.valid ) {
            return 'pi pi-check';
        }
        
        return 'pi pi-exclamation-circle';
    }
    
    get statusIconColor(): 'red' | 'green' {
        if( !valueIsEmpty(this.errors)) {
            return 'red' ;
        }
        
        return 'green';
    }
    
    ngOnInit(): void {
        
        this.required = defaultTo( this.required, false );
        
    }
    
    isFloatLabel(): String {
        if ( isDefined(this.floatLabel) && this.floatLabel ) {
            return "p-float-label p-input-icon-right"
        }
        return "p-input-icon-right";
    }
    
}
