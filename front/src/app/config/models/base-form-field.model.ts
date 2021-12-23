import { Directive, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidatorFn, Validators } from '@angular/forms';
import { defaultTo, isArray, isNil } from 'lodash-es';

@Directive()
export abstract class BaseFormField<T> implements OnInit, ControlValueAccessor {

  @Input() label!: string;
  @Input() keyboardLayout?: 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url';
  @Input() required!: boolean;
  @Input() value!: T;
  @Input() type: any;
  @Input() disableInput!: boolean;
  @Input() placeholder!: string;
  @Input() error?: string;
  @Input() helpText?: string;

  onTouched!: () => void;
  onChange!: (value: any) => void;

  protected constructor(
    @Optional() @Self() public controlDir: NgControl
  ) {
    this.controlDir.valueAccessor = this;
  }

  get errorsAsArray(): string[] {
    if( isNil( this.controlDir.errors ) ) {
      return [];
    }

    return Object
      .keys( this.controlDir.errors )
      .reduce(
        (prevValue: string[], currentValue: string) => [ ...prevValue, currentValue ],
        [] as string[]
      );
  }

  get validClass(): 'p-valid' | 'p-invalid' | undefined {

    if( !this.controlDir.control || !this.controlDir.control.touched ) {
      return;
    }

    if( !this.controlDir.control.valid ) {
      return 'p-invalid';
    }

    return 'p-valid';
  }

  ngOnInit(): void {

    this.disableInput = defaultTo( this.disableInput, false );
    this.required = defaultTo( this.required, false );
    this.keyboardLayout = defaultTo( this.keyboardLayout, 'text' );
    this.placeholder = defaultTo( this.placeholder, '' );

    this.required
    ? this.setValidators( Validators.required )
    : this.setValidators();
  }

  setValidators(validators?: ValidatorFn | ValidatorFn[] | null): void {

    if( isNil( this.controlDir.control ) ) {
      throw new Error( 'Control is undefined' );
    }

    const control = this.controlDir.control;
    let allValidators: ValidatorFn[] = [];

    if( control.validator ) {
      allValidators = [ control.validator ];
    }

    if( !isNil( validators ) ) {
      allValidators = isArray( validators )
                      ? [ ...allValidators, ...validators ]
                      : [ ...allValidators, validators ];
    }

    control.setValidators( allValidators );
    control.updateValueAndValidity();
  }

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disableInput = isDisabled;
  }

  onBlur(): void {
    this.onTouched();
  }

}
